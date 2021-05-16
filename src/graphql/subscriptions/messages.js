import { withFilter, PubSub } from 'apollo-server-express';

const pubsub = new PubSub();

export const conversationUpdated = {
    subscribe: withFilter(
        () => pubsub.asyncIterator(['CONVERSATION_UPDATED']),
        ({ conversationUpdated: payload }, { conversationId }, { currentUser }) => {
            if (!payload.participants.find((e) => e.userId === currentUser.id)) {
                return false;
            }
            if (conversationId) {
                return payload.id === conversationId;
            }
            return true;
        }
    )
};
