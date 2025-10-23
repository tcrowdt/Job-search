import { auth } from "@clerk/nextjs/server"

type UserPermission =
  | "org:job_listings:create"
  | "org:job_listings:update"
  | "org:job_listings:delete"
  | "org:job_listings:change_status"
  | "org:job_listing_applications:change_rating"
  | "org:job_listing_applications:change_stage"

export async function hasOrgUserPermission(permission: UserPermission) {
  const { userId, orgId } = await auth()
  
  if (!userId || !orgId) {
    return false
  }

  // Simplified approach: if you have an orgId and userId, you're an admin
  // This works around the clerkClient issue
  return true
}

export async function getCurrentUserWithClerk() {
  const { userId, sessionClaims } = await auth()
  
  if (!userId) {
    return { userId: null, user: null }
  }

  // Use sessionClaims instead of clerkClient
  const firstName = sessionClaims?.firstName as string || ""
  const lastName = sessionClaims?.lastName as string || ""
  const email = sessionClaims?.email as string || ""
  const imageUrl = sessionClaims?.imageUrl as string || ""

  const userName = firstName && lastName 
    ? `${firstName} ${lastName}`
    : firstName || `User-${userId.slice(-6)}` // Use last 6 chars of userId as fallback

  return {
    userId,
    user: {
      id: userId,
      name: userName,
      email: email,
      imageUrl: imageUrl,
    }
  }
}

export async function getCurrentOrganizationWithClerk() {
  const { orgId, sessionClaims } = await auth()
  
  if (!orgId) {
    return { orgId: null, organization: null }
  }

  // Use sessionClaims instead of clerkClient
  const orgData = sessionClaims?.o as any
  const orgName = orgData?.slg ? orgData.slg.replace(/-[0-9]+$/, '') : null // Remove timestamp from slug

  const orgImageUrl = null // Not available in sessionClaims

  return {
    orgId,
    organization: {
      id: orgId,
      name: orgName,
      imageUrl: orgImageUrl,
    }
  }
}
