import { changeObjectToDotNotationFormat } from '../../utils/helpers';
import { ClassModel } from '../../models/Class';
import escapeStringRegexp from 'escape-string-regexp';

export const getClass = async (parent, args, context, info) => {
    try {
        const { paginate, filter } = args;

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

        const data = await ClassModel.paginate(filterConvert, options);

        return data;
    } catch (error) {
        return error;
    }
};
