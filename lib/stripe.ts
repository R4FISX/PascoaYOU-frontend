import Stripe from "stripe"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_51RALWZD5JvW9zM7PPkysHAwyEf1i2t5nErXDCGEajiaJI5e47SUhkUwIPzb0KyGQFiyeIW9G8GoJ622JeYsHiFq200EHOZtTot"

if (!stripeSecretKey) {
  console.error("Stripe secret key is required")
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-03-31.basil",
})

