import { auth } from "@clerk/nextjs/server"
import { getCurrentUser, getCurrentOrganization } from "@/services/clerk/lib/getCurrentAuth"
import { hasOrgUserPermission } from "@/services/clerk/lib/orgUserPermissions"
import {
  getCurrentUserWithClerk,
  getCurrentOrganizationWithClerk,
  hasOrgUserPermission as hasCustomPermission,
} from "@/services/clerk/lib/customPermissions"

export async function EnhancedDebugContent() {
  const { userId, orgId, sessionClaims } = await auth()
  
  // Get data from database
  const { userId: currentUserId, user: dbUser } = await getCurrentUser({ allData: true })
  const { orgId: currentOrgId, organization: dbOrg } = await getCurrentOrganization({ allData: true })
  
  // Get data from Clerk API
  const { user: clerkUser } = await getCurrentUserWithClerk()
  const { organization: clerkOrg } = await getCurrentOrganizationWithClerk()
  
  // Check permissions with both methods
  const dbPermissions = {
    create: await hasCustomPermission("org:job_listings:create"),
    update: await hasCustomPermission("org:job_listings:update"),
    delete: await hasCustomPermission("org:job_listings:delete"),
    changeStatus: await hasCustomPermission("org:job_listings:change_status"),
  }

  const customPermissions = {
    create: await hasCustomPermission("org:job_listings:create"),
    update: await hasCustomPermission("org:job_listings:update"),
    delete: await hasCustomPermission("org:job_listings:delete"),
    changeStatus: await hasCustomPermission("org:job_listings:change_status"),
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Enhanced Authentication Debug Info</h1>
      
      <div className="space-y-6">
        <div className="bg-gray-800 text-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-white">Clerk Auth Info</h2>
          <pre className="text-sm text-gray-200">
            {JSON.stringify({
              userId,
              orgId,
              sessionClaims: sessionClaims ? Object.keys(sessionClaims) : null,
            }, null, 2)}
          </pre>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 text-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-white">Database User Info</h2>
            <pre className="text-sm text-gray-200">
              {JSON.stringify({
                currentUserId,
                user: dbUser ? {
                  id: dbUser.id,
                  name: dbUser.name,
                  email: dbUser.email,
                } : null,
              }, null, 2)}
            </pre>
          </div>

          <div className="bg-gray-800 text-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-white">Clerk API User Info</h2>
            <pre className="text-sm text-gray-200">
              {JSON.stringify({
                user: clerkUser ? {
                  id: clerkUser.id,
                  name: clerkUser.name,
                  email: clerkUser.email,
                  imageUrl: clerkUser.imageUrl,
                } : null,
              }, null, 2)}
            </pre>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 text-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-white">Database Organization Info</h2>
            <pre className="text-sm text-gray-200">
              {JSON.stringify({
                currentOrgId,
                organization: dbOrg ? {
                  id: dbOrg.id,
                  name: dbOrg.name,
                } : null,
              }, null, 2)}
            </pre>
          </div>

          <div className="bg-gray-800 text-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-white">Clerk API Organization Info</h2>
            <pre className="text-sm text-gray-200">
              {JSON.stringify({
                organization: clerkOrg ? {
                  id: clerkOrg.id,
                  name: clerkOrg.name,
                  imageUrl: clerkOrg.imageUrl,
                } : null,
              }, null, 2)}
            </pre>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 text-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-white">Database Permissions</h2>
            <pre className="text-sm text-gray-200">
              {JSON.stringify(dbPermissions, null, 2)}
            </pre>
          </div>

          <div className="bg-gray-800 text-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-white">Custom Permissions (Admin Check)</h2>
            <pre className="text-sm text-gray-200">
              {JSON.stringify(customPermissions, null, 2)}
            </pre>
          </div>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Analysis & Next Steps</h2>
          <div className="space-y-2 text-sm">
            {!clerkUser && (
              <p className="text-red-600">❌ <strong>Issue:</strong> Cannot get user data from Clerk API</p>
            )}
            {!clerkOrg && (
              <p className="text-red-600">❌ <strong>Issue:</strong> Cannot get organization data from Clerk API</p>
            )}
            {!dbUser && (
              <p className="text-yellow-600">⚠️ <strong>Issue:</strong> User not synced to database</p>
            )}
            {!dbOrg && (
              <p className="text-yellow-600">⚠️ <strong>Issue:</strong> Organization not synced to database</p>
            )}
            {Object.values(customPermissions).every(p => !p) && (
              <p className="text-red-600">❌ <strong>Issue:</strong> You don't have admin permissions in Clerk</p>
            )}
            {Object.values(customPermissions).some(p => p) && (
              <p className="text-green-600">✅ <strong>Good:</strong> You have admin permissions!</p>
            )}
          </div>
          <div className="mt-4 space-x-4">
            <a href="/sync-org" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Sync Data
            </a>
            <a href="/employer/job-listings/new" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Try Create Job
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
