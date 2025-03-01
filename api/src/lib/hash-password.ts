import bcrypt from 'bcryptjs';

import { env } from './env';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(env.SALT_FACTOR);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}
