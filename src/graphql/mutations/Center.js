import { generateHashFromId, generateIdFromHash } from '../../utils/helpers';
import { CenterModel } from '../../models/Center';

export const createCenter = async (parent, args, context, info) => {
    try {
        const center = CenterModel(args.input);

        if (center) {
            center.hash = generateHashFromId(center._id);

            if (center.timeShift && center.timeShift.length) {
                center.timeShift.forEach((e) => {
                    e.hash = generateHashFromId(e._id);
                });
            }
            await center.save();

            return center;
        } else {
            throw new Error('Can not create Center.');
        }
    } catch (error) {
        return error;
    }
};

export const updateCenter = async (parent, args, context, info) => {
    try {
        const { input } = args;
        const { timeShift } = input;

        delete input.timeShift;

        if (input) {
            const center = await CenterModel.findOneAndUpdate(
                { hash: input.hash },
                input,
                { new: true }
            );

            if (timeShift && timeShift.length) {
                center.timeShift = timeShift.map((e) => {
                    if (!e.hash) {
                        e._id = mongoose.Types.ObjectId();
                        e.hash = generateHashFromId(e._id);
                    } else {
                        e._id = generateIdFromHash(e.hash);
                    }

                    return e;
                });
            }
            await center.save();

            return center;
        } else {
            throw new Error('Can not update Center.');
        }
    } catch (error) {
        return error;
    }
};
