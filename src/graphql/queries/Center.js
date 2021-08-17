import { CenterModel } from '../../models/Center';

export const allCenter = async (parent, args, context, info) => {
    try {
        const data = CenterModel.find();

        return data;
    } catch (error) {
        console.log('> allCenter error: ', error);
        throw new ApolloError('Error retrieving all center.');
    }
};
