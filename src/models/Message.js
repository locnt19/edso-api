import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const attachmentSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['media', 'image', 'video'],
      default: 'media',
    },
    attachmentId: { type: Schema.Types.ObjectId },
    url: { type: String },
  },
  { id: false },
);

const messageSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['response', 'update', 'call'],
      default: 'update',
    },
    replyTo: { type: Schema.Types.ObjectId, ref: 'Message' },
    from: { type: Schema.Types.ObjectId },
    to: { type: Schema.Types.ObjectId },
    text: { type: String },
    attachments: [attachmentSchema],
    seenBy: { type: [{ type: Schema.Types.ObjectId }], default: [] },
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      index: true,
    },
    callPayload: { type: Map },
  },
  {
    timestamps: true,
  },
);

messageSchema.plugin(paginate);

const MessageModel = model('Message', messageSchema);

export default MessageModel;
