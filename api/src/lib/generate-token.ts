import { type Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import { env } from './env';

export function generateToken(userId: mongoose.Types.ObjectId, res: Response) {
  const token = jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  });
}
