import { CenterModel } from '../../models/Center';

export const getCenter = async (parent, args, context, info) => {
    try {
        const { paginate, filter } = args;

        const options = {
            page: paginate && paginate.page ? paginate.page : 1,
            limit: paginate && paginate.limit ? paginate.limit : 10
        };

        const data = await CenterModel.paginate({}, options);

        return data;
    } catch (error) {
        return error;
    }
};
