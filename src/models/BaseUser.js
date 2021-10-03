import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import mongoosePaginate from 'mongoose-paginate-v2';

const baseOptions = {
    discriminatorKey: 'role',
    collection: 'users',
    timestamps: true
};

const BaseUserSchema = new Schema(
    {
        hash: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        fullName: { type: String, required: true },
        birthDate: { type: Date, required: true },
        gender: {
            type: String,
            enum: ['M', 'F'],
            required: true
        },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        avatar: String,
        isActive: { type: Boolean, default: true },
        isBlock: { type: Boolean, default: false }
    },
    baseOptions
);

BaseUserSchema.statics.emailExist = async function (email) {
    return this.findOne({ email });
};

BaseUserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

BaseUserSchema.plugin(mongoosePaginate);

const BaseUser = mongoose.model('User', BaseUserSchema);

export default BaseUser;
