import mongoose, { Schema } from 'mongoose';

const centerSchema = new Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String },
        website: { type: String },
        logo: { type: String, required: true },
        type: { type: String, required: true },
        status: { type: String, required: true },
        subscribeLetter: { type: Boolean },
        timeShift: [
            {
                from: { type: String, required: true },
                to: { type: String, required: true }
            }
        ]
    },
    { timestamps: true }
);

const collectionName = 'Center';

export const CenterModel = mongoose.model(collectionName, centerSchema);
