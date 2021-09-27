import { Schema } from 'mongoose';
import BaseUser from './BaseUser';

const ManagerSchema = new Schema({
    schoolId: { type: String, required: true },
    info: { type: String }
})

const Manager = BaseUser.discriminator('Manager', ManagerSchema);

export default Manager;

