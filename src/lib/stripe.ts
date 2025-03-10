import Stripe from "stripe";
import { env } from "@/env";

const stripeSecretKey = env.NEXT_STRIPE_SECRET_KEY
export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
  appInfo: {
    name: 'Pizza Shop',
  }
})