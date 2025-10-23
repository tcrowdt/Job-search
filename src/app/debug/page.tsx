import { Suspense } from "react"
import { DebugContent } from "./DebugContent"
import { EnhancedDebugContent } from "./EnhancedDebugContent"

export default function DebugPage() {
  return (
    <Suspense fallback={<div>Loading debug info...</div>}>
      <EnhancedDebugContent />
    </Suspense>
  )
}
