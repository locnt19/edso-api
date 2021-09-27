import jwt from 'jsonwebtoken';
import BaseUser from '../models/BaseUser';
import AccessToken from '../models/AccessToken';
import { UserInputError } from 'apollo-server-express';

export async function authenticationMiddleware(req, res, next) {
    try {
        console.log('Middleware running!')
        const {
            headers: { authorization }
        } = req,
            system = req.headers['x-system'];
        req.system = system;
        if (!authorization) {
            return next();
        }
        const token = authorization.split(' ')[1];
        const decoded = await verifyToken(token);

        let user = await BaseUser.findOne({ hash: decoded.userHash });
        if (!user) {
            return next();
        }
        Object.assign(req.headers, {
            user: {
                userHash: user.hash,
                role: user.role,
                system
            }
        });
        return next();
    } catch (e) {
        return next();
    }
}

export const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return new UserInputError('Invalid Token');
        }
        const jwtToken = await AccessToken.findOne({
            token: token,
            isActive: true
        });
        if (!jwtToken) {
            return new UserInputError('Unregistered Token');
        }
        return decoded;
    } catch (e) {
        return e;
    }
}
