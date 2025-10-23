"use client"

import { useState } from "react"
import { syncUserAndOrganizationV3 } from "../sync-org/actions-v3"

export function TestSolutionContent() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleTest = async () => {
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🚀 Test Complete Solution</h1>
      
      <div className="bg-gray-800 text-white p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2 text-white">✅ What I've Fixed:</h2>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-200">
          <li><strong>Enhanced Sync:</strong> Now uses Clerk API to get real user and organization data</li>
          <li><strong>Custom Permissions:</strong> Checks if you're an admin in Clerk (bypasses database dependency)</li>
          <li><strong>Real User Names:</strong> Gets your actual name from Clerk instead of generic "User"</li>
          <li><strong>Better Debug Info:</strong> Shows both database and Clerk API data side by side</li>
        </ul>
      </div>

      <div className="bg-gray-800 text-white p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2 text-white">🧪 Test the Solution:</h2>
        <p className="text-sm mb-4 text-gray-200">
          Click the button below to test the enhanced sync. This should now:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm mb-4 text-gray-200">
          <li>Get your real name from Clerk</li>
          <li>Get your organization name (NexZim)</li>
          <li>Check if you're an admin</li>
          <li>Sync everything to the database</li>
        </ul>
        
        <button
          onClick={handleTest}
          disabled={isLoading}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Testing..." : "Test Enhanced Sync"}
        </button>
      </div>

      {result && (
        <div className={`p-4 rounded-lg ${result.error ? "bg-red-900 text-white" : "bg-green-900 text-white"}`}>
          <h3 className={`text-lg font-semibold mb-2 ${result.error ? "text-red-200" : "text-green-200"}`}>
            {result.error ? "❌ Test Failed" : "✅ Test Successful!"}
          </h3>
          <p className={result.error ? "text-red-200" : "text-green-200"}>
            {result.message}
          </p>
          {!result.error && result.debug && (
            <div className="mt-4 p-3 bg-gray-800 rounded">
              <h4 className="font-semibold mb-2 text-white">Debug Info:</h4>
              <pre className="text-xs text-gray-300 overflow-auto">
                {JSON.stringify(result.debug, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 space-x-4">
        <a 
          href="/debug" 
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Enhanced Debug Info
        </a>
        <a 
          href="/employer/job-listings/new" 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Try Create Job Listing
        </a>
        <a 
          href="/employer/test-permissions" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Test Permissions
        </a>
      </div>
    </div>
  )
}
