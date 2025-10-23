import { auth } from "@clerk/nextjs/server"
import { getCurrentUser, getCurrentOrganization } from "@/services/clerk/lib/getCurrentAuth"
import { hasOrgUserPermission } from "@/services/clerk/lib/orgUserPermissions"

export async function DebugContent() {
  const { userId, orgId, sessionClaims } = await auth()
  const { userId: currentUserId, user } = await getCurrentUser({ allData: true })
  const { orgId: currentOrgId, organization } = await getCurrentOrganization({ allData: true })
  
  const permissions = {
    create: await hasOrgUserPermission("org:job_listings:create"),
    update: await hasOrgUserPermission("org:job_listings:update"),
    delete: await hasOrgUserPermission("org:job_listings:delete"),
    changeStatus: await hasOrgUserPermission("org:job_listings:change_status"),
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Authentication Debug Info</h1>
      
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

        <div className="bg-gray-800 text-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-white">Current User Info</h2>
          <pre className="text-sm text-gray-200">
            {JSON.stringify({
              currentUserId,
              user: user ? {
                id: user.id,
                name: user.name,
                email: user.email,
              } : null,
            }, null, 2)}
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-white">Current Organization Info</h2>
          <pre className="text-sm text-gray-200">
            {JSON.stringify({
              currentOrgId,
              organization: organization ? {
                id: organization.id,
                name: organization.name,
              } : null,
            }, null, 2)}
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-white">Permissions</h2>
          <pre className="text-sm text-gray-200">
            {JSON.stringify(permissions, null, 2)}
          </pre>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Next Steps</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>If <code>orgId</code> is null, you need to create/select an organization</li>
            <li>If <code>organization</code> is null, the organization doesn't exist in the database</li>
            <li>If permissions are false, you need admin role in the organization</li>
            <li>Go to <a href="/organizations/select" className="text-blue-600 underline">/organizations/select</a> to create/select an organization</li>
            <li>Go to <a href="/sync-org" className="text-blue-600 underline">/sync-org</a> to sync your data to the database</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
