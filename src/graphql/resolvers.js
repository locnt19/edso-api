import {
  ObjectIDResolver,
  EmailAddressResolver,
  DateTimeResolver,
  DateResolver,
  URLResolver,
  JSONObjectResolver,
} from 'graphql-scalars';
import {
  conversations,
  messages,
  callInAppLoginInfo,
  callInAppUserExtension,
} from './queries';
import { sendMessage, createConversation } from './mutations';
import { conversationUpdated } from './subscriptions';
import { ConversationResolver } from './types/Conversation';
import { MessageResolver } from './types/Message';
import { CallInAppLoginInfoResolver } from './types/CallInAppLoginInfo';

export const resolvers = {
  Query: {
    conversations,
    messages,
    callInAppLoginInfo,
    callInAppUserExtension,
  },
  Mutation: {
    sendMessage,
    createConversation,
  },
  Subscription: {
    conversationUpdated,
  },
  Conversation: ConversationResolver,
  Message: MessageResolver,
  CallInAppLoginInfo: CallInAppLoginInfoResolver,
  ObjectID: ObjectIDResolver,
  JSONObject: JSONObjectResolver,
  EmailAddress: EmailAddressResolver,
  DateTime: DateTimeResolver,
  Date: DateResolver,
  URL: URLResolver,
};
