import { Suspense } from "react"
import { SyncOrgContent } from "./SyncOrgContent"

export default function SyncOrgPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SyncOrgContent />
    </Suspense>
  )
}
