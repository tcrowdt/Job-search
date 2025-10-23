import { auth } from "@clerk/nextjs/server"
import { PLAN_FEATURES, getCurrentPlan } from "./planConfig"

type PlanFeature =
  | "post_1_job_listing"
  | "post_3_job_listings"
  | "post_15_job_listings"
  | "unlimited_featured_jobs_listings"
  | "1_featured_job_listing"

export async function hasPlanFeature(feature: PlanFeature) {
  // Get current plan
  const currentPlan = getCurrentPlan()
  
  // Check if feature is available in current plan
  const planFeatures = PLAN_FEATURES[currentPlan as keyof typeof PLAN_FEATURES]
  return planFeatures?.[feature] ?? false
}
