// app/api/calendly/event/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { eventUri } = await req.json();

  if (!eventUri) {
    return NextResponse.json({ error: "Missing eventUri" }, { status: 400 });
  }

  try {
    const res = await fetch(eventUri, {
      headers: {
        Authorization: `Bearer ${process.env.CALENDLY_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || "Failed to fetch" }, { status: res.status });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching Calendly event" }, { status: 500 });
  }
}
