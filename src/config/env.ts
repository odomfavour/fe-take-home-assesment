import { z } from 'zod';

const envSchema = z.object({
  VITE_APP_BASE_PATH: z.string(),
  VITE_MOCK_API: z.string().optional()
});

export const env = envSchema.parse(import.meta.env);

export const APP_BASE_PATH = env.VITE_APP_BASE_PATH;
