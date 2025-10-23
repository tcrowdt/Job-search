import { Suspense } from "react"
import { JobBoardSidebar } from "../_shared/JobBoardSidebar"

export default function JobBoardSidebarPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobBoardSidebar />
    </Suspense>
  )
}
