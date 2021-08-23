import { generateHashFromId, generateIdFromHash } from '../../utils/helpers';
import { ClassModel } from '../../models/Class';

export const createClass = async (parent, args, context, info) => {
    try {
        const input = ClassModel(args.input);

        if (input) {
            input.hash = generateHashFromId(input._id);
            await input.save();

            return input;
        } else {
            throw new Error('Can not create Class.');
        }
    } catch (error) {
        return error;
    }
};

export const updateClass = async (parent, args, context, info) => {
    try {
        const { input } = args;
        const { hash } = input;

        delete input.hash;

        if (input && hash) {
            const data = await ClassModel.findOneAndUpdate({ hash }, input, {
                new: true
            });

            return data;
        } else {
            throw new Error('Can not update Class.');
        }
    } catch (error) {
        return error;
    }
};
