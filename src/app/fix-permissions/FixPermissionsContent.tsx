"use client"

import { useState } from "react"

export function FixPermissionsContent() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleFixPermissions = async () => {
    setIsLoading(true)
    try {
      // This is a temporary solution - in production you'd want proper role management
      const response = await fetch('/api/fix-permissions', {
        method: 'POST',
      })
      
      const data = await response.json()
      setResult(data.message)
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Fix Permissions</h1>
      
      <div className="bg-yellow-100 p-4 rounded-lg mb-6">
        <p className="text-yellow-800">
          <strong>Note:</strong> This is a temporary fix. In production, you should set up proper role management in Clerk.
        </p>
      </div>

      <div className="bg-blue-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Steps to Fix Permissions:</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Go to your <a href="https://dashboard.clerk.com/" target="_blank" className="text-blue-600 underline">Clerk Dashboard</a></li>
          <li>Navigate to <strong>Organizations</strong> → <strong>Members</strong></li>
          <li>Find your user and make sure you have <strong>Admin</strong> role</li>
          <li>If you don't have Admin role, click on your user and change the role to Admin</li>
          <li>Come back here and test the permissions</li>
        </ol>
      </div>

      <button
        onClick={handleFixPermissions}
        disabled={isLoading}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Fixing..." : "Test Permissions Fix"}
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-800">{result}</p>
        </div>
      )}

      <div className="mt-6 space-x-4">
        <a 
          href="/debug" 
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Check Debug Info
        </a>
        <a 
          href="/employer/test-permissions" 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Test Permissions
        </a>
      </div>
    </div>
  )
}
