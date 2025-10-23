import { Suspense } from "react"
import { FixPermissionsContent } from "./FixPermissionsContent"

export default function FixPermissionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FixPermissionsContent />
    </Suspense>
  )
}
