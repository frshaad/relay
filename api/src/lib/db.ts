import mongoose from 'mongoose';

import { env } from './env';
import { log } from './logger';

export async function connectDB() {
  try {
    await mongoose.connect(env.DB_URI);
    log.info('Connected to DB');
  } catch (error) {
    log.error("Couldn't connect to DB", error);
    process.exit(1);
  }
}
