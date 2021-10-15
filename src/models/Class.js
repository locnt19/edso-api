import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const classSchema = new Schema(
    {
        centerHash: { type: String, required: true },
        hash: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        subjectHash: { type: String, required: true },
        status: {
            type: String,
            default: 'open',
            enum: ['started', 'open', 'closed']
        },
        maxStudent: { type: Number },
        code: { type: String },
        year: { type: String },
        students: [
            {
                teacherApprovedHash: { type: String, required: true },
                studentHash: { type: String, required: true },
                status: {
                    type: String,
                    default: 'pending',
                    enum: ['pending', 'approved']
                }
            }
        ],
        timeFrame: [
            {
                timeShiftHash: { type: String, required: true },
                date: {
                    type: String,
                    required: true,
                    enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
                }
            }
        ],
        studentReport: [
            {
                studentReportHash: { type: String, required: true }
            }
        ]
    },
    { timestamps: true }
);

classSchema.plugin(mongoosePaginate);

const collectionName = 'Class';

export const ClassModel = mongoose.model(collectionName, classSchema);
