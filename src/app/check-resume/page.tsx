import { Suspense } from "react"
import { CheckResumeContent } from "./CheckResumeContent"

export default function CheckResumePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckResumeContent />
    </Suspense>
  )
}
