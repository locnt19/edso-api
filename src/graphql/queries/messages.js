import MessageModel from '../../models/Message';
import { paginationLabelsOptions } from '../../utils';

export const messages = (
    rootValue,
    { conversationId, offset = 0, limit = 15 },
) => {
    try {
        return MessageModel.paginate(
            {
                conversationId,
            },
            {
                sort: '-createdAt',
                offset,
                limit,
                customLabels: paginationLabelsOptions,
            },
        );
    } catch (e) {
        return e;
    }
};
