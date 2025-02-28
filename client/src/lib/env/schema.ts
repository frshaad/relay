import { z } from 'zod';

export const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
});

export type Environment = z.infer<typeof environmentSchema>;
