import { Schema } from 'mongoose';
import BaseUser from './BaseUser';

const ManagerSchema = new Schema({
    info: { type: String }
})

const Manager = BaseUser.discriminator('Manager', ManagerSchema);

export default Manager;

