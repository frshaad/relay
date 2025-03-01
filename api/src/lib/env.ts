import 'dotenv/config';
import { z } from 'zod';

export const environmentSchema = z.object({
  PORT: z.coerce.number(),
  DB_URI: z.string(),
});

export type Environment = z.infer<typeof environmentSchema>;

export function validateEnvironment(): Environment {
  // eslint-disable-next-line n/no-process-env
  const parsed = environmentSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors,
    );
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
}

const env = validateEnvironment();
export default env;
