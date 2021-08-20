import { CenterModel } from '../../models/Center';
import escapeStringRegexp from 'escape-string-regexp';

export const getCenter = async (parent, args, context, info) => {
    try {
        const { paginate, filter } = args;

        const options = {
            page: paginate && paginate.page ? paginate.page : 1,
            limit: paginate && paginate.limit ? paginate.limit : 10
        };

        const filterConvert = filter && changeObjectToDotNotationFormat(filter);

        if (filterConvert) {
            for (const key in filterConvert) {
                if (Object.hasOwnProperty.call(filterConvert, key)) {
                    const element = filterConvert[key];
                    const $regex = escapeStringRegexp(element);

                    filterConvert[key] = { $regex: new RegExp($regex, 'i') };
                }
            }
        }

        const data = await CenterModel.paginate(filterConvert, options);

        return data;
    } catch (error) {
        return error;
    }
};

function changeObjectToDotNotationFormat(inputObject, current, prefinalObject) {
    const result = prefinalObject ?? {};

    for (const key in inputObject) {
        const value = inputObject[key];
        const newKey = current ? `${current}.${key}` : key;
        if (value && typeof value === 'object') {
            changeObjectToDotNotationFormat(value, newKey, result);
        } else {
            result[newKey] = value;
        }
    }

    return result;
}
