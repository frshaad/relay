import type { Response } from 'express';
import type mongoose from 'mongoose';

import { PASSWORD_MIN_LENGTH } from '../lib/constants';
import { ValidationError } from '../lib/errors';
import { generateToken } from '../lib/generate-token';
import { hashPassword } from '../lib/hash-password';
import { User } from '../models/user.model';

type SignupInput = {
  email: string;
  fullname: string;
  password: string;
};

type UserResponse = {
  _id: mongoose.Types.ObjectId;
  fullname: string;
  email: string;
  profilePic: string;
};

export const UserService = {
  async signup(
    data: SignupInput,
    res: Response,
  ): Promise<{ user: UserResponse }> {
    const { email, fullname, password } = data;

    if (!email || !fullname || !password) {
      throw new ValidationError(`All fields are required.`);
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
      throw new ValidationError(
        `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
      );
    }

    const normalizedEmail = email.toLowerCase();

    try {
      const existingUser = await User.findOne({
        email: normalizedEmail,
      });

      if (existingUser) {
        throw new ValidationError('Email is already in use');
      }
    } catch (error) {
      console.error('Error checking existing user:', error);
      throw error;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      fullname,
      email: normalizedEmail,
      password: hashedPassword,
    });

    if (!newUser) {
      throw new ValidationError('Invalid user data');
    }

    generateToken(newUser._id, res);

    await newUser.save();

    return {
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic,
      },
    };
  },
};
