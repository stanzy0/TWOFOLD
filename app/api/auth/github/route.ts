import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const baseUrl = process.env.NEXTAUTH_URL;

  if (!clientId || !baseUrl) {
    return NextResponse.json({ error: "GitHub auth is not configured on the server." }, { status: 500 });
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${baseUrl}/api/auth/github/callback`,
    scope: "read:user user:email",
  });

  const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
  return NextResponse.redirect(authUrl);
}
