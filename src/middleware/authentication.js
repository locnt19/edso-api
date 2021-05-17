import jwt from 'jsonwebtoken';
import UserModel from '../models/User';
import AccessTokenModel from '../models/AccessToken';
import basicAuth from 'basic-auth';
import { UserInputError } from 'apollo-server-express';

export async function basicAuthenticationMiddleware(req, res, next) {
    try {
        const {
            headers: { authorization }
        } = req;
        if (!authorization) {
            return next();
        }
        const authUser = basicAuth(req);
        let username = process.env.USER_NAME;
        if (authUser && authUser.name === username && authUser.pass === process.env.PASSWORD) {
            req.basicAuthenticated = true;
        }
        next();
    } catch (e) {
        return next();
    }
}

export async function authenticationMiddleware(req, res, next) {
    try {
        const {
                headers: { authorization }
            } = req,
            system = req.headers['x-system'];
        req.system = system;
        if (!authorization) {
            return next();
        }
        const accessToken = authorization.split(' ')[1];

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        if (!decoded) {
            return next();
        }
        const jwtToken = await AccessTokenModel.findOne({
            token: accessToken,
            isActive: true
        });
        if (!jwtToken) {
            return next();
        }
        let user = await UserModel.findById(decoded.userId);
        if (!user) {
            return next();
        }
        Object.assign(req, {
            user,
            accessToken,
            system
        });
        return next();
    } catch (e) {
        return next();
    }
}

export const verifyToken = async (rootValue, { accessToken }, { t }) => {
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        if (!decoded) {
            return new UserInputError(t('invalidToken'));
        }
        const jwtToken = await AccessTokenModel.findOne({
            token: accessToken,
            isActive: true
        });
        if (!jwtToken) {
            return new UserInputError(t('invalidToken'));
        }
        let user = await UserModel.findById(decoded.userId);
        if (!user) {
            return new UserInputError(t('userNotFound'));
        }
        Object.assign(t, {
            user,
            accessToken
        });
        return user;
    } catch (e) {
        return e;
    }
};
