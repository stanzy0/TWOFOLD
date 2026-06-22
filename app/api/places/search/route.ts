import { NextResponse } from "next/server";

const GOOGLE_PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY;

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!GOOGLE_PLACES_KEY) {
    return NextResponse.json({ error: "Google Places API key not configured" }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const radius = searchParams.get("radius") || "1500";

    let url: string;
    if (lat && lng) {
      url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&key=${GOOGLE_PLACES_KEY}`;
    } else if (q) {
      url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(q + " restaurant")}&key=${GOOGLE_PLACES_KEY}`;
    } else {
      return NextResponse.json({ error: "Query or location required" }, { status: 400 });
    }

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch places" }, { status: 500 });
  }
}
