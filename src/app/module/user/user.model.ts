import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const UserSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
    required: true,
  },
});

UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  console.log(user);
  next();
});

// Post-save middleware to clear the password from the response
UserSchema.post('save', function (doc, next) {
  doc.password = '';
  console.log(doc);
  next();
});

export const User = model<TUser>('User', UserSchema);
