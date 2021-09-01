import { Schema } from 'mongoose';
import BaseUser from './BaseUser';

const TeacherSchema = new Schema({
    level: { type: String, required: true },
    classIDs: { type: [Schema.Types.ObjectId] }
})

const Teacher = BaseUser.discriminator('Teacher', TeacherSchema);

export default Teacher;

