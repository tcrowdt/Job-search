import { Suspense } from "react"
import { TestSolutionContent } from "./TestSolutionContent"

export default function TestSolutionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TestSolutionContent />
    </Suspense>
  )
}
