import { Suspense } from "react"
import { TestPermissionsContent } from "./TestPermissionsContent"

export default function TestPermissionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TestPermissionsContent />
    </Suspense>
  )
}
