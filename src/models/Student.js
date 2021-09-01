import { Schema } from 'mongoose';
import BaseUser from './BaseUser';

const StudentSchema = new Schema({
    reports: { type: [Schema.Types.ObjectId] }
})

const Student = BaseUser.discriminator('Student', StudentSchema);

export default Student;
