import mongoose, { Schema } from 'mongoose';

const accessTokenSchema = new Schema(
    {
        token: String,
        owner: String,
        isActive: { type: Boolean, default: true },
        device: String,
        ip: String,
        deactivatedAt: Date,
        lastSeenAt: Date,
    },
    { timestamps: true },
);

const AccessTokenModel = mongoose.model('AccessToken', accessTokenSchema);

export default AccessTokenModel;
