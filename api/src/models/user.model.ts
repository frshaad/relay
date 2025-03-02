import mongoose from 'mongoose';

import { PASSWORD_MIN_LENGTH } from '../lib/constants';

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minLength: PASSWORD_MIN_LENGTH },
    profilePic: { type: String, default: '' },
  },
  { timestamps: true },
);

type UserType = mongoose.InferSchemaType<typeof userSchema>;
const User = mongoose.model('User', userSchema);

export { User, type UserType };
