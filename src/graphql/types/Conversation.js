import { gql } from 'apollo-server-express';
import { isUndefined } from 'lodash';
import MessageModel from '../../models/Message';

export const ConversationTypeDefs = gql`
  type Participant {
    id: ObjectID
    nickname: String
    userId: ObjectID
  }

  type Conversation {
    id: ObjectID
    name: String
    participants: [Participant]
    createdAt: DateTime
    updatedAt: DateTime
    lastMessage: Message
    typing: Boolean
  }

  type PaginationOfConversation implements PaginationOf {
    "Self descriptive"
    hasNextPage: Boolean
    "Self descriptive"
    hasPrevPage: Boolean
    "Self descriptive"
    limit: Int
    "Self descriptive"
    nextPage: Int
    "Self descriptive"
    offset: Int
    "Self descriptive"
    prevPage: Int
    "Self descriptive"
    total: Int
    "Self descriptive"
    totalPages: Int
    "Conversations"
    items: [Conversation]
  }

  type MutationOfConversation implements MutationOf {
    "Mutation result"
    success: Boolean
    "Mutation message"
    msg: String
    "Conversation"
    payload: Conversation
  }
`;

export const ConversationResolver = {
  id: (instance) => instance.id || instance._id,
  lastMessage: (instance) => {
    if (isUndefined(instance.lastMessage)) {
      return MessageModel.findOne({ conversationId: instance.id }).sort({
        createdAt: -1,
      });
    }
    return instance.lastMessage;
  },
  typing: (instance) => instance.typing || false,
};
