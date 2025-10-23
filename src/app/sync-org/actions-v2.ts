"use server"

import { auth } from "@clerk/nextjs/server"
import { insertOrganization } from "@/features/organizations/db/organizations"
import { insertUser } from "@/features/users/db/users"

export async function syncUserAndOrganizationV2() {
  const { userId, orgId, sessionClaims } = await auth()
  
  if (!userId) {
    return {
      error: true,
      message: "You must be signed in to sync your data"
    }
  }

  if (!orgId) {
    return {
      error: true,
      message: "You must have an organization to sync"
    }
  }

  try {
    // Debug: Log what we have in sessionClaims
    console.log("SessionClaims:", JSON.stringify(sessionClaims, null, 2))
    
    // Try to get organization name from different possible locations
    const orgName = (sessionClaims as any)?.orgs?.[orgId]?.name || 
                   (sessionClaims as any)?.org?.name || 
                   (sessionClaims as any)?.organization?.name ||
                   "NexZim" // Fallback to your known organization name

    // Try to get user details from different possible locations
    const userName = sessionClaims?.firstName && sessionClaims?.lastName 
      ? `${sessionClaims.firstName} ${sessionClaims.lastName}`
      : (sessionClaims?.firstName as string) || 
        (sessionClaims?.name as string) ||
        (sessionClaims?.username as string) ||
        "User"

    const userEmail = (sessionClaims?.email as string) || 
                     (sessionClaims?.emailAddress as string) ||
                     ""

    const userImageUrl = (sessionClaims?.imageUrl as string) || 
                        (sessionClaims?.avatar as string) ||
                        ""

    // Sync user to database
    await insertUser({
      id: userId,
      name: userName,
      email: userEmail,
      imageUrl: userImageUrl,
    })

    // Sync organization to database
    await insertOrganization({
      id: orgId,
      name: orgName,
      imageUrl: (sessionClaims as any)?.orgs?.[orgId]?.imageUrl || 
               (sessionClaims as any)?.org?.imageUrl || 
               (sessionClaims as any)?.organization?.imageUrl ||
               null,
    })

    return {
      error: false,
      message: `Successfully synced user "${userName}" and organization "${orgName}" to the database`,
      debug: {
        sessionClaimsKeys: Object.keys(sessionClaims || {}),
        orgName,
        userName,
        userEmail
      }
    }
  } catch (error) {
    return {
      error: true,
      message: error instanceof Error ? error.message : "Unknown error occurred"
    }
  }
}
