import { generateHashFromId, generateIdFromHash } from '../../utils/helpers';
import { ClassModel } from '../../models/Class';

export const createClass = async (parent, args, context, info) => {
    try {
        const data = ClassModel(args.input);

        data.hash = generateHashFromId(data._id);
        await data.save();

        return {
            success: true,
            msg: 'Create Class successfully',
            payload: data
        };
    } catch (error) {
        return error;
    }
};

export const updateClass = async (parent, args, context, info) => {
    try {
        const { input } = args;
        const { hash } = input;

        delete input.hash;

        const data = await ClassModel.findOneAndUpdate({ hash }, input, {
            new: true
        });

        return {
            success: true,
            msg: 'Update Class successfully',
            payload: data
        };
    } catch (error) {
        return error;
    }
};
