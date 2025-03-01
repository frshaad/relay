import { z } from 'zod';

export const environmentSchema = z.object({
  PORT: z.coerce.number(),
});

export type Environment = z.infer<typeof environmentSchema>;
