import { SubscriptionPlan } from "types"
import { env } from "@/env.mjs"

export const starterPlan: SubscriptionPlan = {
  name: "Starter",
  description:
    "Perfect for small businesses. Includes a 5-page website, basic SEO, and 1 month of support.",
  stripePriceId: "",
}

export const growthPlan: SubscriptionPlan = {
  name: "Growth",
  description:
    "For growing businesses. Includes up to 15 pages, advanced SEO, social media setup, and 3 months support.",
  stripePriceId: env.STRIPE_PRO_MONTHLY_PLAN_ID || "",
}

export const enterprisePlan: SubscriptionPlan = {
  name: "Enterprise",
  description:
    "Full-scale solution. Custom web app, full digital marketing, dedicated account manager, priority support.",
  stripePriceId: "",
}

// Backward compatibility for existing billing code paths.
export const freePlan: SubscriptionPlan = starterPlan
export const proPlan: SubscriptionPlan = growthPlan
