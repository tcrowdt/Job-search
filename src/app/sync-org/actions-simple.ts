"use server"

import { auth } from "@clerk/nextjs/server"
import { insertOrganization } from "@/features/organizations/db/organizations"
import { insertUser } from "@/features/users/db/users"

export async function syncUserAndOrganizationSimple() {
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
    // Extract user details from sessionClaims
    const firstName = sessionClaims?.firstName as string || ""
    const lastName = sessionClaims?.lastName as string || ""
    const email = sessionClaims?.email as string || ""
    const imageUrl = sessionClaims?.imageUrl as string || ""

    const userName = firstName && lastName 
      ? `${firstName} ${lastName}`
      : firstName || "User"

    // Try to get organization name from sessionClaims
    const orgName = (sessionClaims as any)?.orgs?.[orgId]?.name ||
                   (sessionClaims as any)?.org?.name ||
                   "NexZim" // Fallback to your known organization name

    const orgImageUrl = (sessionClaims as any)?.orgs?.[orgId]?.imageUrl ||
                       (sessionClaims as any)?.org?.imageUrl ||
                       null

    console.log("SessionClaims data:", {
      firstName,
      lastName,
      email,
      orgName,
      orgId,
      sessionClaimsKeys: Object.keys(sessionClaims || {})
    })

    // Sync user to database
    await insertUser({
      id: userId,
      name: userName,
      email: email,
      imageUrl: imageUrl,
    })

    // Sync organization to database
    await insertOrganization({
      id: orgId,
      name: orgName,
      imageUrl: orgImageUrl,
    })

    return {
      error: false,
      message: `Successfully synced user "${userName}" and organization "${orgName}" to the database`,
      debug: {
        user: {
          id: userId,
          name: userName,
          email: email,
          imageUrl: imageUrl,
        },
        organization: {
          id: orgId,
          name: orgName,
          imageUrl: orgImageUrl,
        },
        sessionClaimsKeys: Object.keys(sessionClaims || {}),
        hasFirstName: !!firstName,
        hasLastName: !!lastName,
        hasEmail: !!email,
      }
    }
  } catch (error) {
    console.error("Sync error:", error)
    return {
      error: true,
      message: error instanceof Error ? error.message : "Unknown error occurred"
    }
  }
}
