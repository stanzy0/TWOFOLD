import { NextResponse } from "next/server";

export async function GET() {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.DROPBOX_APP_KEY!,
    redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/dropbox/callback`,
    token_access_type: "offline",
  });

  const authUrl = `https://www.dropbox.com/oauth2/authorize?${params.toString()}`;
  return NextResponse.redirect(authUrl);
}
