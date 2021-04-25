import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import { readFileSync } from 'fs';
import path from 'path';
import _, { pickBy } from 'lodash';
import moment from 'moment';
import { exec } from 'child_process';

/**
 * Return a unique identifier with the given `len`.
 *
 *     utils.uid(10);
 *     // => "FDaS435D2z"
 *
 * @param {Number} len
 * @return {String}
 * @api private
 */

export function uid(len) {
    const buf = [],
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charlen = chars.length;

    for (let i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
}

export function random6digits() {
    return Math.floor(100000 + Math.random() * 900000);
}

export function randomDigits(length) {
    return Math.floor(
        Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1),
    );
}

export function createIdByUnixTimestamps(prefix: String) {
    return `${prefix}-${moment().unix()}-${randomDigits(7)}`;
}

export function uidLight(len) {
    const buf = [],
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz0123456789',
        charlen = chars.length;

    for (let i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }
    return buf.join('');
}

/**
 * Return a random int, used by `utils.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get HTML email template
 *
 * see: https://www.npmjs.com/package/handlebars
 */
export function getHeaderEmailTemplate(variables) {
    const data = {
        headerText1: variables.headerText1
            ? variables.headerText1
            : 'Welcome to OCR',
        headerText2: variables.headerText2
            ? variables.headerText2
            : 'powered SalemSolutions',
        content: '{{content}}',
    };
    const html = readFileSync(
        path.join(__dirname, '../microServices/commonService/src/template/email') +
        '/global-template.html',
        {
            encoding: 'utf-8',
        },
    );
    return handlebars.compile(html)(data);
}

export function getHtmlFromTemplate(htmlTemplate, variables) {
    return new Promise(async (resolve) => {
        try {
            let newHtml = getHeaderEmailTemplate(variables);
            const html = readFileSync(
                path.join(
                    __dirname,
                    '../microServices/commonService/src/template/email',
                ) +
                '/' +
                htmlTemplate +
                '-content.html',
                { encoding: 'utf-8' },
                ),
                template = handlebars.compile(html),
                result = template(variables);
            newHtml = newHtml.replace('{{content}}', result);
            resolve(newHtml);
        } catch (error) {
            throw error;
        }
    });
}

export async function sendEmail(
    mailTo,
    subject,
    htmlTemplate,
    variables,
    attach,
) {
    const transporter = nodemailer.createTransport({
            port: 465,
            host: 'smtp.mail.us-east-1.awsapps.com',
            secure: true,
            auth: {
                user: process.env.EMAIL, // generated ethereal user
                pass: process.env.EMAIL_PASSWORD, // generated ethereal password
            },
        }),
        attachFile = attach || null,
        html = await getHtmlFromTemplate(htmlTemplate, variables);
    const mailOptions = {};
    if (attachFile) {
        Object.assign(mailOptions, {
            from: `${process.env.APP_NAME} ${process.env.EMAIL}`, // email
            to: mailTo,
            subject: subject,
            html: html,
            attachments: [
                {
                    // stream as an attachment
                    filename: attachFile.fileName,
                    content: new Buffer(attachFile.data, 'utf-8'),
                },
            ],
        });
    } else {
        Object.assign(mailOptions, {
            from: `"${process.env.APP_NAME}" ${process.env.EMAIL}`, // email
            to: mailTo,
            subject: subject,
            html: html,
        });
    }
    return transporter.sendMail(mailOptions);
}

/**
 *
 * @param {String} phone
 * Valid format:
 * (123) 456-7890
 * (123)456-7890
 * 123-456-7890
 * 123.456.7890
 * 1234567890
 * +31636363634
 */
export const phoneValidator = (phone) => {
    const regex = /^0([35789])[0-9]{8}$/;
    return regex.test(phone);
};

export const emailValidator = (email) => {
    const regex = /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/i;
    return regex.test(email);
};

export const cleanObject = (originalObject = {}) => {
    const validArrays = pickBy(
        originalObject,
        (e) => Array.isArray(e) && e.length > 0,
        ),
        validObjects = pickBy(
            originalObject,
            (e) =>
                e !== undefined &&
                e !== null &&
                e !== '' &&
                !Array.isArray(e) &&
                typeof e === 'object' &&
                Object.keys(e).length > 0,
        ),
        validProperties = pickBy(
            originalObject,
            (e) =>
                e !== undefined &&
                e !== null &&
                e !== '' &&
                !Array.isArray(e) &&
                typeof e !== 'object',
        );
    return { ...validProperties, ...validArrays, ...validObjects };
};

export function cleanArray(myArray) {
    return myArray.filter(Boolean);
}

export const isEmptyFromToObject = (data = {}) => {
    return (
        (_.isNil(data.from) && _.isNil(data.to)) ||
        (data.from === 0 && data.to === 0)
    );
};

export function generateIpFromReq(req) {
    return (
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null)
    );
}

export function getDefaultPagingOptions(
    page = 1,
    limit = 20,
    sort = { createdAt: -1 },
    replaceDocsName = 'items',
) {
    return {
        sort: !_.isEmpty(sort) ? sort : { createdAt: -1 },
        page: page,
        limit: limit,
        customLabels: {
            totalDocs: 'total',
            docs: replaceDocsName,
            perPage: 'limit',
            currentPage: 'currentPage',
            next: 'nextPage',
            prev: 'prevPage',
            pageCount: 'totalPages',
            slNo: 'pagingCounter',
        },
    };
}

export function createFullAddress(province, district, ward, street) {
    return `${!_.isEmpty(street) ? street.name + ', ' : ''}${
        !_.isEmpty(ward) ? ward.name + ', ' : ''
    } ${!_.isEmpty(district) ? district.name + ', ' : ''}${
        !_.isEmpty(province.name) ? province.name : ''
    }`;
}

export function addDaysToCurrentUnixTime(sourceUnix, days = 0) {
    return sourceUnix ? sourceUnix + days * 24 * 3600 : 0;
}

export function addToCurrentUnixTime(sourceUnix, amount = 0) {
    return sourceUnix ? sourceUnix + amount : 0;
}

export function createHashtagByAddress(districtName, wardName) {
    const hashtag = [];
    if (districtName) {
        if (districtName.includes('Quận')) {
            const newDistrictName = districtName.replace('Quận ', '');
            hashtag.push(`q${newDistrictName}`, `q ${newDistrictName}`);
        } else {
            const newDistrictName = districtName.replace('Huyện ', '');
            hashtag.push(`h ${newDistrictName}`);
        }
    }
    if (wardName) {
        const newWardName = wardName.replace('P.0', '').replace('P.');
        hashtag.push(`p${newWardName}`, `p ${newWardName}`);
    }
    return hashtag;
}

export function cleanArrayElement(object) {
    const validArrays = pickBy(object, (e) => Array.isArray(e) && e.length > 0),
        validObjects = pickBy(
            object,
            (e) =>
                e !== undefined &&
                e !== null &&
                e !== '' &&
                !Array.isArray(e) &&
                typeof e === 'object' &&
                Object.keys(e).length > 0,
        ),
        validProperties = pickBy(
            object,
            (e) =>
                e !== undefined &&
                e !== null &&
                e !== '' &&
                !Array.isArray(e) &&
                typeof e !== 'object',
        ),
        validElementArray = pickBy(validArrays, function (e) {
            e = cleanArray(e);
            return e.length > 0;
        });

    return {
        ..._.map(validElementArray, (e) => cleanArray(e)),
        ...validObjects,
        ...validProperties,
    };
}

export function execCommand(cmd, opts) {
    opts || (opts = {});
    return new Promise((resolve, reject) => {
        const child = exec(cmd, opts, (err, stdout, stderr) =>
            err
                ? reject(err)
                : resolve({
                    stdout: stdout,
                    stderr: stderr,
                }),
        );

        if (opts.stdout) {
            child.stdout.pipe(opts.stdout);
        }
        if (opts.stderr) {
            child.stderr.pipe(opts.stderr);
        }
    });
}
