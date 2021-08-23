import { generateHashFromId, generateIdFromHash } from '../../utils/helpers';
import { ClassModel } from '../../models/Class';

export const createClass = async (parent, args, context, info) => {
    try {
        const classModel = ClassModel(args.input);

        if (classModel) {
            classModel.hash = generateHashFromId(classModel._id);
            await classModel.save();

            return classModel;
        } else {
            throw new Error('Can not create Class.');
        }
    } catch (error) {
        return error;
    }
};
