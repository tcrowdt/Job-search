import { Card, CardContent } from "@/components/ui/card"
import { JobListingForm } from "@/features/jobListings/components/JobListingForm"

export default function NewJobListingPage() {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">New Job Listing</h1>
      <p className="text-muted-foreground mb-6">
        Create a new job listing. You can save it as a draft or publish it immediately.
      </p>
      <Card>
        <CardContent>
          <JobListingForm />
        </CardContent>
      </Card>
    </div>
  )
}
