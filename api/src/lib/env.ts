/* eslint-disable n/no-process-env */
import 'dotenv/config';
import { z } from 'zod';

export const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.coerce.number(),
  DB_URI: z.string(),
  SALT_FACTOR: z.coerce.number(),
  JWT_SECRET: z.string(),
});

export const env = environmentSchema.parse(process.env);

export function validateEnvironment() {
  const parsed = environmentSchema.safeParse(process.env);

  if (!parsed.success) {
    const errorMessage = Object.entries(parsed.error.flatten().fieldErrors)
      .map(([key, errors]) => `${key}: ${errors?.join(', ')}`)
      .join('\n');

    throw new Error(`Invalid environment variables:\n${errorMessage}`);
  }
}
