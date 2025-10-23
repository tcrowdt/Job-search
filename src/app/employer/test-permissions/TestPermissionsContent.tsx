import { getCurrentOrganization, getCurrentUser } from "@/services/clerk/lib/getCurrentAuth"
import { hasOrgUserPermission } from "@/services/clerk/lib/orgUserPermissions"
import { createJobListing } from "@/features/jobListings/actions/actions"

export async function TestPermissionsContent() {
  const { userId, user } = await getCurrentUser({ allData: true })
  const { orgId, organization } = await getCurrentOrganization({ allData: true })
  
  const permissions = {
    create: await hasOrgUserPermission("org:job_listings:create"),
    update: await hasOrgUserPermission("org:job_listings:update"),
    delete: await hasOrgUserPermission("org:job_listings:delete"),
    changeStatus: await hasOrgUserPermission("org:job_listings:change_status"),
  }

  // Test creating a job listing
  let testResult = null
  if (permissions.create && orgId) {
    try {
      const result = await createJobListing({
        title: "Test Job Listing",
        description: "This is a test job listing",
        experienceLevel: "junior",
        stateAbbreviation: null,
        type: "full-time",
        wage: null,
        wageInterval: null,
        city: null,
        locationRequirement: "remote"
      })
      testResult = { success: true, result }
    } catch (error) {
      testResult = { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Permission Test</h1>
      
      <div className="space-y-6">
        <div className="bg-gray-800 text-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-white">User Info</h2>
          <pre className="text-sm text-gray-200">
            {JSON.stringify({
              userId,
              user: user ? {
                id: user.id,
                name: user.name,
                email: user.email,
              } : null,
            }, null, 2)}
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-white">Organization Info</h2>
          <pre className="text-sm text-gray-200">
            {JSON.stringify({
              orgId,
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

        <div className="bg-gray-800 text-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-white">Test Job Creation</h2>
          <pre className="text-sm text-gray-200">
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Next Steps</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>If user is null, go to <a href="/sync-org" className="text-blue-600 underline">/sync-org</a> to sync your user</li>
            <li>If organization is null, go to <a href="/sync-org" className="text-blue-600 underline">/sync-org</a> to sync your organization</li>
            <li>If permissions are false, make sure you're an admin in your organization</li>
            <li>If test job creation failed, check the error message above</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
