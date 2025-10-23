"use client"

import { useState } from "react"
import { syncUserAndOrganization } from "./actions"
import { syncUserAndOrganizationV2 } from "./actions-v2"
import { syncUserAndOrganizationV3 } from "./actions-v3"
import { syncUserAndOrganizationSimple } from "./actions-simple"

export function SyncOrgContent() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ error: boolean; message: string } | null>(null)

  const handleSync = async () => {
    setIsLoading(true)
    try {
      const res = await syncUserAndOrganizationV3()
      setResult(res)
    } catch (error) {
      setResult({
        error: true,
        message: error instanceof Error ? error.message : "Unknown error occurred"
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (result) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">
          {result.error ? "Sync Error" : "Organization Synced!"}
        </h1>
        <div className={`p-4 rounded-lg ${result.error ? "bg-red-100" : "bg-green-100"}`}>
          <p className={result.error ? "text-red-800" : "text-green-800"}>
            {result.message}
          </p>
          {!result.error && (result as any).debug && (
            <div className="mt-4 p-3 bg-gray-100 rounded">
              <h4 className="font-semibold mb-2">Debug Info:</h4>
              <pre className="text-xs text-gray-600">
                {JSON.stringify((result as any).debug, null, 2)}
              </pre>
            </div>
          )}
        </div>
        <div className="mt-4 space-x-4">
          <a 
            href="/debug" 
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Check Debug Info
          </a>
          {!result.error && (
            <a 
              href="/employer/job-listings/new" 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create Job Listing
            </a>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sync User Data</h1>
      <div className="bg-blue-100 p-4 rounded-lg mb-6">
        <p className="text-blue-800">
          Click the button below to sync your Clerk user data to the database. 
          This will enable you to upload resumes and apply for jobs.
        </p>
        <p className="text-blue-800 text-sm mt-2">
          <strong>For employers:</strong> This will also sync your organization data to enable job listing creation.
        </p>
      </div>
      <button
        onClick={handleSync}
        disabled={isLoading}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Syncing..." : "Sync User Data"}
      </button>
    </div>
  )
}
