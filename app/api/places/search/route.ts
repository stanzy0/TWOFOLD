import { NextResponse } from "next/server";

const GEOAPIFY_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_KEY;

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!GEOAPIFY_KEY) {
    return NextResponse.json({ error: "Geoapify API key not configured. Add NEXT_PUBLIC_GEOAPIFY_KEY in Vercel environment variables." }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const radius = searchParams.get("radius") || "5000";

    let url: string;
    if (lat && lng) {
      url = `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:${lng},${lat},${radius}&limit=20&apiKey=${GEOAPIFY_KEY}`;
    } else if (q) {
      url = `https://api.geoapify.com/v2/places?text=${encodeURIComponent(q + " restaurant")}&categories=catering.restaurant&limit=20&apiKey=${GEOAPIFY_KEY}`;
    } else {
      return NextResponse.json({ error: "Query or location required" }, { status: 400 });
    }

    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    const places = (data.features || []).map((feat: Record<string, unknown>) => {
      const props = (feat.properties || {}) as Record<string, unknown>;
      const geometry = (feat.geometry || {}) as { coordinates?: [number, number] };
      const datasource = (props.datasource || {}) as { raw?: Record<string, unknown> };
      const raw = datasource.raw || {};
      return {
        place_id: String(props.place_id || props.name || Math.random()),
        name: String(props.name || "Unknown"),
        rating: typeof props.rate === "number" ? props.rate : undefined,
        price_level: typeof props.price_level === "number" ? props.price_level : undefined,
        formatted_address: String(props.formatted || props.address_line2 || ""),
        opening_hours: (props.opening_hours as Record<string, boolean> | undefined) || {},
        photos: Array.isArray(raw.photoUrls) && raw.photoUrls.length > 0
          ? [{ photo_reference: String(raw.photoUrls[0]) }]
          : undefined,
        types: Array.isArray(props.categories) ? props.categories.map(String) : [],
        geometry: { location: { lat: Number(geometry.coordinates?.[1] ?? props.lat ?? 0), lng: Number(geometry.coordinates?.[0] ?? props.lon ?? 0) } },
      };
    });

    return NextResponse.json({ results: places });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to fetch places";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
