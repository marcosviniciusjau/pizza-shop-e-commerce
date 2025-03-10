import { z } from 'zod'
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  NEXT_API_BASE_URL: z.string().url(),
  NEXT_URL: z.string().url(),
  NEXT_RESTAURANT_ID: z.string().min(1),
  NEXT_STRIPE_PUBLIC_KEY: z.string().min(1),
  NEXT_STRIPE_SECRET_KEY: z.string().min(1),
})

const parsedEnv = {
  NEXT_API_BASE_URL: process.env.NEXT_API_BASE_URL,
  NEXT_URL: process.env.NEXT_URL,
  NEXT_RESTAURANT_ID: process.env.NEXT_RESTAURANT_ID,
  NEXT_STRIPE_PUBLIC_KEY: process.env.NEXT_STRIPE_PUBLIC_KEY,
  NEXT_STRIPE_SECRET_KEY: process.env.NEXT_STRIPE_SECRET_KEY,
}
export const env = envSchema.parse(parsedEnv)
