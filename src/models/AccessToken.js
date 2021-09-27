import mongoose, { Schema } from 'mongoose';

const AccessTokenSchema = new Schema(
    {
        ownerId: String,
        token: String,
        isActive: { type: Boolean, default: true },
        device: String,
        ip: String,
        deactivatedAt: Date,
        lastSeenAt: Date
    },
    { timestamps: true }
);

AccessTokenSchema.statics.deactivatePreviousToken = async function (userId) {
    const filter = { ownerId: userId, isActive: true };
    const update = { isActive: false };
    return this.findOneAndUpdate(filter, update);
};

const AccessToken = mongoose.model('AccessToken', AccessTokenSchema);

export default AccessToken;
