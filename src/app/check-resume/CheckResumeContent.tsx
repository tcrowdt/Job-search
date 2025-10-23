import { getCurrentUser } from "@/services/clerk/lib/getCurrentAuth"
import { db } from "@/drizzle/db"
import { UserResumeTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export async function CheckResumeContent() {
  const { userId } = await getCurrentUser()
  
  if (!userId) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Check Resume Status</h1>
        <div className="bg-red-100 p-4 rounded-lg">
          <p className="text-red-800">You must be signed in to check your resume status.</p>
        </div>
      </div>
    )
  }

  // Check if user exists in database
  const userResume = await db.query.UserResumeTable.findFirst({
    where: eq(UserResumeTable.userId, userId),
  })

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Resume Status Check</h1>
      
      <div className="space-y-4">
        <div className="bg-gray-800 text-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-white">User ID</h2>
          <p className="text-gray-200">{userId}</p>
        </div>

        {userResume ? (
          <div className="bg-green-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-green-800">✅ Resume Found in Database</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Resume URL:</strong> {userResume.resumeFileUrl || "Not available"}</p>
              <p><strong>File Key:</strong> {userResume.resumeFileKey || "Not available"}</p>
              <p><strong>AI Summary:</strong> {userResume.aiSummary ? "Available" : "Not generated yet"}</p>
            </div>
            {userResume.resumeFileUrl && (
              <div className="mt-4">
                <a 
                  href={userResume.resumeFileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  View Resume
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-red-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-red-800">❌ No Resume Found in Database</h2>
            <p className="text-red-800 text-sm">
              Your resume is not in the database. This could be because:
            </p>
            <ul className="list-disc list-inside text-red-800 text-sm mt-2 space-y-1">
              <li>The upload didn't complete properly</li>
              <li>Your user data isn't synced to the database</li>
              <li>There was an error during the upload process</li>
            </ul>
            <div className="mt-4 space-x-4">
              <a 
                href="/user-settings/resume" 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Upload Resume Again
              </a>
              <a 
                href="/sync-org" 
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Sync User Data
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
