import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { stubTrue } from 'lodash';
// import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

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
        schoolID: String,
        avatar: String,
        isActive: {type: Boolean, default: true}
    }, baseOptions
);

BaseUserSchema.statics.emailExist = async function (email) {
    return this.findOne({ email });
};

BaseUserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// userSchema.plugin(aggregatePaginate);
// userSchema.plugin(AutoIncrement, {id: 'sequential_id', inc_field: 'sid', reference_fields: ['role']})

const BaseUser = mongoose.model('User', BaseUserSchema);

export default BaseUser;



