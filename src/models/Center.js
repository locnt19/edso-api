import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const centerSchema = new Schema(
    {
        hash: { type: String, required: true },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        address: { type: String },
        website: { type: String },
        logo: { type: String, required: true },
        type: { type: String, required: true },
        status: { type: String, required: true },
        subscribeLetter: { type: Boolean },
        termsAndConditions: { type: String },
        timeShift: [
            {
                hash: { type: String, required: true },
                from: { type: String, required: true },
                to: { type: String, required: true }
            }
        ]
    },
    { timestamps: true }
);

centerSchema.plugin(mongoosePaginate);

const collectionName = 'Center';

export const CenterModel = mongoose.model(collectionName, centerSchema);
