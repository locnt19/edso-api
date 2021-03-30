import { Schema, model, connection } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const userInternalPhoneSchema = new Schema(
  {
    extension: { type: Number, unique: true },
    password: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, unique: true },
  },
  {
    timestamps: true,
  },
);

autoIncrement.initialize(connection);

userInternalPhoneSchema.plugin(autoIncrement.plugin, {
  model: 'UserInternalPhone',
  field: 'extension',
  startAt: 1000,
});

const UserInternalPhoneModel = model(
  'UserInternalPhone',
  userInternalPhoneSchema,
);

export default UserInternalPhoneModel;
