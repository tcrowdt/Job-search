"use server"

import { auth } from "@clerk/nextjs/server"
import { insertOrganization } from "@/features/organizations/db/organizations"
import { insertUser } from "@/features/users/db/users"

export async function syncUserAndOrganization() {
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
    // Get organization name from sessionClaims or use a default
    const orgName = (sessionClaims as any)?.orgs?.[orgId]?.name || 
                   (sessionClaims as any)?.org?.name || 
                   "NexZim" // Default to your organization name

    // Sync user to database
    await insertUser({
      id: userId,
      name: sessionClaims?.firstName && sessionClaims?.lastName 
        ? `${sessionClaims.firstName} ${sessionClaims.lastName}`
        : (sessionClaims?.firstName as string) || "User",
      email: (sessionClaims?.email as string) || "",
      imageUrl: (sessionClaims?.imageUrl as string) || "",
    })

    // Sync organization to database
    await insertOrganization({
      id: orgId,
      name: orgName,
      imageUrl: (sessionClaims as any)?.orgs?.[orgId]?.imageUrl || 
               (sessionClaims as any)?.org?.imageUrl || 
               null,
    })

    return {
      error: false,
      message: `Successfully synced user and organization "${orgName}" to the database`
    }
  } catch (error) {
    return {
      error: true,
      message: error instanceof Error ? error.message : "Unknown error occurred"
    }
  }
}
