import { Schema } from 'mongoose';
import BaseUser from './BaseUser';

const StudentSchema = new Schema({
    centerId: { type: String, required: true },
    classIds: { type: [Schema.Types.ObjectId] }
})

const Student = BaseUser.discriminator('Student', StudentSchema);

export default Student;

