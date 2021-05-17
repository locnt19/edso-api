import { Schema, model } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const participantSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    nickname: { type: String }
});

const conversationSchema = new Schema(
    {
        name: { type: String },
        participants: [participantSchema]
    },
    {
        timestamps: true
    }
);

conversationSchema.plugin(aggregatePaginate);

const ConversationModel = model('Conversation', conversationSchema);

export default ConversationModel;
