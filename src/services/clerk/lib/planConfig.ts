// Plan configuration - update this based on your actual billing plan
export const PLAN_FEATURES = {
  // Free plan features
  free: {
    post_1_job_listing: true,
    post_3_job_listings: false,
    post_15_job_listings: false,
    unlimited_featured_jobs_listings: false,
    "1_featured_job_listing": false,
  },
  
  // Pro plan features (update based on your actual plan)
  pro: {
    post_1_job_listing: true,
    post_3_job_listings: true,
    post_15_job_listings: true,
    unlimited_featured_jobs_listings: true,
    "1_featured_job_listing": true,
  },
  
  // Enterprise plan features
  enterprise: {
    post_1_job_listing: true,
    post_3_job_listings: true,
    post_15_job_listings: true,
    unlimited_featured_jobs_listings: true,
    "1_featured_job_listing": true,
  }
}

// Get current plan based on your billing
// You can update this to check your actual billing system
export function getCurrentPlan() {
  // For now, return 'pro' since you upgraded
  // TODO: Integrate with your actual billing system
  return 'pro'
}
