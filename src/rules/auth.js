import { verifyToken } from '../middleware/authentication';

export async function authReq(context) {
    const { req } = context;
    try {
        const {
            headers: { authorization },
        } = req;
        if (!authorization) {
            return;
        }
        const accessToken = authorization.split(' ')[1],
            user = await verifyToken(accessToken);
        if (!user) {
            return;
        }
        context.user = user;
        context.accessToken = accessToken;
    } catch (e) {
        // Ignore error
    }
}
