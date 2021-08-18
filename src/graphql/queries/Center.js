import { CenterModel } from '../../models/Center';

export const getCenter = async (parent, args, context, info) => {
    try {
        const data = await CenterModel.paginate();

        return data;
    } catch (error) {
        return error;
    }
};
