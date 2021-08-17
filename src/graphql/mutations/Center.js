import { CenterModel } from '../../models/Center';

export const createCenter = async (parent, args, context, info) => {
    try {
        return args.input;
    } catch (error) {
        console.log('> createCenter error: ', error);
        throw new ApolloError('Error saving center.');
    }
};
