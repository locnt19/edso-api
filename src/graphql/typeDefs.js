import { gql } from 'apollo-server-express';
import { ConversationTypeDefs } from './types/Conversation';
import { MessageTypeDefs } from './types/Message';
import { CallInAppLoginInfoTypeDefs } from './types/CallInAppLoginInfo';

export const typeDefs = gql`
    scalar Upload

    scalar EmailAddress

    scalar ObjectID

    scalar DateTime

    scalar Date

    scalar URL

    scalar JSONObject

    interface MutationOf {
        "Mutation result"
        success: Boolean
        "Mutation message"
        msg: String
    }

    interface PaginationOf {
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
    }

    type MutationMessage implements MutationOf {
        "Mutation result"
        success: Boolean
        "Mutation message"
        msg: String
    }

    type Query {
        "List conversation"
        conversations(offset: Int, limit: Int): PaginationOfConversation
        "List messages of a conversation"
        messages(conversationId: ObjectID!, offset: Int, limit: Int): PaginationOfMessage
        "Get call in app login info"
        callInAppLoginInfo: CallInAppLoginInfo
        callInAppUserExtension(userId: ObjectID!): CallInAppUserExtension
    }

    type Mutation {
        createConversation(userIds: [ObjectID!]!): MutationOfConversation
        sendMessage(
            recipient: RecipientInput!
            message: MessageInput
            senderAction: SenderAction
        ): MutationOfConversation
    }

    type Subscription {
        conversationUpdated(conversationId: ObjectID): Conversation
    }

    ${ConversationTypeDefs}
    ${MessageTypeDefs}
    ${CallInAppLoginInfoTypeDefs}
`;
