import { Schema } from 'mongoose';
import BaseUser from './BaseUser';

const SupportSchema = new Schema({
    schoolId: { type: String, required: true },
    info: { type: String }
})

const Support = BaseUser.discriminator('Support', SupportSchema);

export default Support;

