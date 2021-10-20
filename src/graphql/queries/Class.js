import { changeObjectToDotNotationFormat } from '../../utils/helpers';
import { ClassModel } from '../../models/Class';
import escapeStringRegexp from 'escape-string-regexp';

export const getClass = async (parent, args, context, info) => {
    try {
        const { paginate, filter } = args;
        if(context.user.centerId) filter.centerId = context.user.centerId;

        const options = {
            page: paginate && paginate.page ? paginate.page : 1,
            limit: paginate && paginate.limit ? paginate.limit : 10
        };

        const filterObject = filter && changeObjectToDotNotationFormat(filter);
        let filterArray = [];

        if (filterObject) {
            for (const key in filterObject) {
                if (Object.hasOwnProperty.call(filterObject, key)) {
                    const element = filterObject[key];
                    const $regex = escapeStringRegexp(element);

                    filterObject[key] = { $regex: new RegExp($regex, 'i') };
                }
            }

            filterArray = Object.keys(filterObject).map((key) => {
                return { [key]: filterObject[key] };
            });
        }

        const data = await ClassModel.paginate(
            filterArray.length
                ? {
                      $and: filterArray
                  }
                : filterObject,
            options
        );

        return data;
    } catch (error) {
        return error;
    }
};
