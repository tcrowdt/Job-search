"use server"

import { auth } from "@clerk/nextjs/server"
import { insertOrganization } from "@/features/organizations/db/organizations"
import { insertUser } from "@/features/users/db/users"

export async function syncUserAndOrganizationV3() {
  const { userId, orgId, sessionClaims } = await auth()
  
  if (!userId) {
    return {
      error: true,
      message: "You must be signed in to sync your data"
    }
  }

  // Organization is optional - only needed for employers, not job seekers

  try {
    // Extract user details from sessionClaims
    // Note: User details like firstName, lastName, email are not in sessionClaims by default
    // They need to be fetched separately or configured in Clerk
    const firstName = sessionClaims?.firstName as string || ""
    const lastName = sessionClaims?.lastName as string || ""
    const email = sessionClaims?.email as string || ""
    const imageUrl = sessionClaims?.imageUrl as string || ""

    const userName = firstName && lastName 
      ? `${firstName} ${lastName}`
      : firstName || null

    // Extract organization data from the 'o' (organization) field
    const orgData = sessionClaims?.o as any
    const orgName = orgData?.slg ? orgData.slg.replace(/-[0-9]+$/, '') : null // Remove timestamp from slug
    const orgImageUrl = null // Not available in sessionClaims

    console.log("Full SessionClaims:", JSON.stringify(sessionClaims, null, 2))
    console.log("SessionClaims data:", {
      firstName,
      lastName,
      email,
      orgName,
      orgId,
      orgData,
      sessionClaimsKeys: Object.keys(sessionClaims || {})
    })

    // For now, use a fallback name since sessionClaims doesn't include user profile data
    const finalUserName = userName || `User-${userId.slice(-6)}` // Use last 6 chars of userId as fallback

    // Organization is optional - only sync if orgId exists

    // Sync user to database
    await insertUser({
      id: userId,
      name: finalUserName,
      email: email,
      imageUrl: imageUrl,
    })

    // Sync organization to database (only if orgId exists)
    if (orgId && orgName) {
      await insertOrganization({
        id: orgId,
        name: orgName,
        imageUrl: orgImageUrl,
      })
    }

    return {
      error: false,
      message: orgId 
        ? `Successfully synced user "${finalUserName}" and organization "${orgName}" to the database`
        : `Successfully synced user "${finalUserName}" to the database`,
      debug: {
        user: {
          id: userId,
          name: finalUserName,
          email: email,
          imageUrl: imageUrl,
        },
        organization: orgId ? {
          id: orgId,
          name: orgName,
          imageUrl: orgImageUrl,
        } : null,
        sessionClaimsKeys: Object.keys(sessionClaims || {}),
        hasFirstName: !!firstName,
        hasLastName: !!lastName,
        hasEmail: !!email,
        orgData: orgData,
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