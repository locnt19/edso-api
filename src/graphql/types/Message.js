import { gql } from 'apollo-server-express';

export const MessageTypeDefs = gql`
    enum AttachmentType {
        media
        image
        video
    }

    enum SenderAction {
        typingOn
        typingOff
        markSeen
    }

    enum RecipientType {
        conversation
        users
    }

    input AttachmentInput {
        type: AttachmentType
        attachmentId: ObjectID
        url: URL
    }

    input MessageInput {
        text: String
        attachments: [AttachmentInput]
    }

    input RecipientInput {
        recipientType: RecipientType!
        conversationId: ObjectID
        userIds: [ObjectID]
    }

    enum MessageType {
        response
        update
        call
    }

    type Attachment {
        type: AttachmentType
        attachmentId: ObjectID
        url: String
    }

    type Message {
        id: ObjectID
        from: ObjectID
        to: ObjectID
        text: String
        type: MessageType
        callPayload: JSONObject
        attachments: [Attachment]
        seenBy: [ObjectID]
        createdAt: DateTime
        updatedAt: DateTime
    }

    type PaginationOfMessage implements PaginationOf {
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
        "Message"
        items: [Message]
    }
`;

export const MessageResolver = {
    id: (instance) => instance.id || instance._id,
};
