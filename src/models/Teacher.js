import { Schema } from 'mongoose';
import BaseUser from './BaseUser';

const TeacherSchema = new Schema({
    schoolId: { type: String, required: true },
    level: { type: String, required: true },
    classIds: { type: [Schema.Types.ObjectId] },
    subjects: { type: [String], required: true},
    workPlace: { type: String, required: true}
})

const Teacher = BaseUser.discriminator('Teacher', TeacherSchema);

export default Teacher;

