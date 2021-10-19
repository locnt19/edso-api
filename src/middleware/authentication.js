import jwt from 'jsonwebtoken';
import BaseUser from '../models/BaseUser';
import AccessToken from '../models/AccessToken';

export async function authenticationMiddleware(req, res, next) {
    try {
        const {
                headers: { authorization }
            } = req,
            system = req.headers['x-system'];
        req.system = system;

        if (!authorization) {
            throw new Error('Not found authorization');
        }

        const token = authorization.split(' ')[1];
        const decoded = await verifyToken(token);

        let user = await BaseUser.findOne({ hash: decoded.userHash });

        if (!user) {
            throw new Error('User not found');
        }

        Object.assign(req.headers, {
            user: {
                userHash: user.hash,
                role: user.role,
                centerId: user.centerId,
                system
            }
        });

        return next();
    } catch (error) {
        // TODO: next error to Rule GraphQL middleware
        return next();
    }
}

export const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            throw new Error('Invalid Token');
        }
        const jwtToken = await AccessToken.findOne({
            token: token,
            isActive: true
        });

        if (!jwtToken) {
            throw new Error('Unregistered Token');
        }

        if (decoded.isBlock) {
            throw new Error('Your account is blocked');
        }

        return decoded;
    } catch (e) {
        return e;
    }
};
