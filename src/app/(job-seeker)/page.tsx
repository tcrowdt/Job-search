import { Suspense } from "react"
import { JobListingItems } from "./_shared/JobListingItems"

export default function HomePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>
}) {
  return (
    <div className="m-4">
      <Suspense fallback={<div>Loading job listings...</div>}>
        <JobListingItems searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
