import { Schema } from 'mongoose';
import BaseUser from './BaseUser';

const AdminSchema = new Schema({
    info: { type: String }
})

const Admin = BaseUser.discriminator('Admin', AdminSchema);

export default Admin;

