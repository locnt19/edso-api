import { changeObjectToDotNotationFormat } from '../../utils/helpers';
import { CenterModel } from '../../models/Center';
import escapeStringRegexp from 'escape-string-regexp';

export const getCenter = async (parent, args, context, info) => {
    try {
        const { paginate, filter } = args;
        if(context.user.centerId) filter.centerId = context.user.centerId;

        const options = {
            page: paginate && paginate.page ? paginate.page : 1,
            limit: paginate && paginate.limit ? paginate.limit : 10
        };

        const filterConvert = filter && changeObjectToDotNotationFormat(filter);

        if (filterConvert) {
            for (const key in filterConvert) {
                if (Object.hasOwnProperty.call(filterConvert, key)) {
                    const element = filterConvert[key];
                    const $regex = escapeStringRegexp(element);

                    filterConvert[key] = { $regex: new RegExp($regex, 'i') };
                }
            }
        }

        const data = await CenterModel.paginate(filterConvert, options);

        return data;
    } catch (error) {
        return error;
    }
};
