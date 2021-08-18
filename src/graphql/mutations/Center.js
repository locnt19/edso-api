import { CenterModel } from '../../models/Center';

export const createCenter = async (parent, args, context, info) => {
    try {
        const center = CenterModel(args.input);

        if (center) {
            center.hash = center._id + '_fakeHash';

            if (center.timeShift && center.timeShift.length) {
                center.timeShift.forEach((e) => {
                    e.hash = e._id + '_fakeHash';
                });
            }
            await center.save();

            return center;
        } else {
            throw new Error('Cant create Center Model.');
        }
    } catch (error) {
        return error;
    }
};
