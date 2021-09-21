import Joi from 'joi';
import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { emailRegex, phoneRegex } from '../utils/helpers';

const centerSchema = new Schema(
    {
        hash: { type: String, required: true, unique: true },
        name: { type: String, required: true, trim: true },
        phone: {
            type: String,
            required: true,
            validate: (value) => {
                const valid = Joi.string()
                    .regex(phoneRegex)
                    .messages({
                        'string.pattern.base':
                            'Phone number must have 10 digits.'
                    })
                    .validate(value);

                if (valid.error) {
                    throw new Error(valid.error.details[0].message);
                }
            }
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: (value) => {
                const valid = Joi.string()
                    .regex(emailRegex)
                    .messages({
                        'string.pattern.base': 'invalid email.'
                    })
                    .validate(value);

                if (valid.error) {
                    throw new Error(valid.error.details[0].message);
                }
            }
        },
        address: { type: String },
        website: { type: String },
        logo: { type: String, required: true },
        type: {
            type: String,
            required: true,
            enum: ['center', 'school']
        },
        status: {
            type: String,
            required: true,
            enum: ['active', 'deactive']
        },
        subscribeLetter: { type: Boolean },
        termsAndConditions: { type: String },
        timeShift: [
            {
                hash: { type: String, required: true, unique: true },
                from: { type: Number, required: true },
                to: { type: Number, required: true }
            }
        ]
    },
    { timestamps: true }
);

centerSchema.plugin(mongoosePaginate);

const collectionName = 'Center';

export const CenterModel = mongoose.model(collectionName, centerSchema);
