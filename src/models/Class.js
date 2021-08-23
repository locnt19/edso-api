import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const classSchema = new Schema(
    {
        centerId: { type: String, required: true },
        hash: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        subjectId: { type: String, required: true },
        status: { type: String, default: 'open' }, // started | open | closed
        maxStudent: { type: Number },
        code: { type: String },
        year: { type: String },
        students: [
            {
                teacherApproved: { type: String, required: true },
                studentId: { type: String, required: true },
                status: { type: String, default: 'pending' } // pending | approved
            }
        ],
        timeFrame: [
            {
                timeShift: { type: String, required: true },
                date: { type: String, required: true } // mon | tue | wed | thu | fri | sat | sun
            }
        ],
        studentReport: [
            {
                studentReport: { type: String, required: true }
            }
        ]
    },
    { timestamps: true }
);

classSchema.plugin(mongoosePaginate);

const collectionName = 'Class';

export const ClassModel = mongoose.model(collectionName, classSchema);
