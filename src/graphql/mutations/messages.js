import { UserInputError, PubSub } from 'apollo-server-express';
import { sendMessageSchema } from '../../utils';
import ConversationModel from '../../models/Conversation';
import MessageModel from '../../models/Message';

const pubsub = new PubSub();

export const createConversation = async (rootValue, { userIds }, { user }) => {
    try {
        let foundConversation = await ConversationModel.findOne({
            'participants.userId': { $all: [user.id, ...userIds] },
            participants: { $size: [user.id, ...userIds].length }
        });
        if (!foundConversation) {
            foundConversation = await new ConversationModel({
                participants: [user.id, ...userIds].map((userId) => ({
                    userId,
                    nickname: null
                }))
            }).save();
        }

        return {
            success: true,
            msg: 'Create conversation successfully',
            payload: foundConversation
        };
    } catch (e) {
        return e;
    }
};

export const sendMessage = async (rootValue, { recipient, message, senderAction }, { user }) => {
    try {
        const { error } = sendMessageSchema.validate({
            recipient,
            message,
            senderAction
        });
        if (error) {
            return new UserInputError(error.message, error);
        }

        /* Create conversation*/
        let foundConversation;
        const { recipientType, conversationId, userIds } = recipient;
        if (recipientType === 'conversation') {
            foundConversation = await ConversationModel.findById(conversationId);
            if (!foundConversation) {
                return new UserInputError(`No conversation found for id ${conversationId}`);
            }
        } else {
            foundConversation = await ConversationModel.findOne({
                'participants.userId': { $all: [user.id, ...userIds] },
                participants: { $size: [user.id, ...userIds].length }
            });
            if (!foundConversation) {
                foundConversation = await new ConversationModel({
                    participants: [user.id, ...userIds].map((userId) => ({
                        userId,
                        nickname: null
                    }))
                }).save();
            }
        }

        /* Create message*/
        if (!senderAction) {
            const createdMessage = await new MessageModel({
                from: user.id,
                text: message.text,
                attachments: message.attachments,
                conversationId: foundConversation.id,
                seenBy: [user.id]
            }).save();
            await pubsub.publish('CONVERSATION_UPDATED', {
                conversationUpdated: {
                    ...foundConversation.toObject({ getters: true }),
                    lastMessage: createdMessage
                }
            });
            foundConversation.set('updatedAt', new Date());
            await foundConversation.save();
        } else if (
            ['typingOn', 'typingOff'].indexOf(senderAction) >= 0 &&
            !foundConversation.isNew
        ) {
            await pubsub.publish('CONVERSATION_UPDATED', {
                conversationUpdated: {
                    ...foundConversation.toObject({ getters: true }),
                    typing: senderAction === 'typingOn'
                }
            });
        } else {
            await MessageModel.updateMany(
                {
                    conversationId: foundConversation,
                    seenBy: { $ne: user.id }
                },
                {
                    $push: { seenBy: user.id }
                }
            );
            await pubsub.publish('CONVERSATION_UPDATED', {
                conversationUpdated: foundConversation
            });
            foundConversation.set('updatedAt', new Date());
            await foundConversation.save();
        }

        return {
            success: true,
            msg: 'Send message successfully',
            payload: foundConversation
        };
    } catch (e) {
        return e;
    }
};
