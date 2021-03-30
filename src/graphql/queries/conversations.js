import mongoose from 'mongoose';
import ConversationModel from '../../models/Conversation';
import { paginationLabelsOptions } from '../../utils';

export const conversations = async (
  rootValue,
  { offset = 0, limit = 10 },
  { user },
) => {
  try {
    const aggregation = ConversationModel.aggregate([
      {
        $match: {
          participants: {
            $elemMatch: { userId: mongoose.Types.ObjectId(user.id) },
          },
        },
      },
      {
        $lookup: {
          from: 'messages',
          localField: '_id',
          foreignField: 'conversationId',
          as: 'messages',
        },
      },
      { $unwind: { path: '$messages' } },
      { $sort: { 'messages.createdAt': -1 } },
      {
        $addFields: {
          lastMessage: '$messages',
        },
      },
      {
        $match: {
          lastMessage: { $ne: null },
        },
      },
      { $group: { _id: '$_id', conversation: { $first: '$$ROOT' } } },
      {
        $replaceRoot: {
          newRoot: '$conversation',
        },
      },
    ]);
    return ConversationModel.aggregatePaginate(aggregation, {
      offset,
      limit,
      customLabels: paginationLabelsOptions,
      sort: '-updatedAt',
    });
  } catch (e) {
    return e;
  }
};
