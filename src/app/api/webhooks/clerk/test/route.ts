import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    message: "Clerk webhook endpoint is working!",
    timestamp: new Date().toISOString(),
    endpoint: "/api/webhooks/clerk",
    events: [
      "user.created",
      "organization.created", 
      "organizationMembership.created"
    ]
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    return NextResponse.json({
      message: "Test webhook received",
      receivedData: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      error: "Invalid JSON",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 400 })
  }
}
