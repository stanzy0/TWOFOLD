import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    const errorDesc = searchParams.get("error_description") || "Authorization was denied or cancelled.";
    return NextResponse.redirect(new URL(`/login?error=access_denied&msg=${encodeURIComponent(errorDesc)}`, request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=no_code&msg=Missing authorization code from GitHub.", request.url));
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const baseUrl = process.env.NEXTAUTH_URL;

  if (!clientId || !clientSecret || !baseUrl) {
    return NextResponse.json({ error: "GitHub auth is not configured." }, { status: 500 });
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: `${baseUrl}/api/auth/github/callback`,
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(new URL(`/login?error=token_failed&msg=GitHub token exchange failed with status ${tokenRes.status}.`, request.url));
  }

  const tokenData = await tokenRes.json();

  if (tokenData.error) {
    const errMsg = tokenData.error_description || tokenData.error;
    return NextResponse.redirect(new URL(`/login?error=${tokenData.error}&msg=${encodeURIComponent(errMsg)}`, request.url));
  }

  const userRes = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      Accept: "application/json",
    },
  });

  if (!userRes.ok) {
    return NextResponse.redirect(new URL("/login?error=user_fetch_failed&msg=Could not fetch user profile from GitHub.", request.url));
  }

  const userData = await userRes.json();

  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  response.cookies.set("twofold_session", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  response.cookies.set("twofold_user", JSON.stringify({
    name: userData.name || userData.login,
    email: userData.email,
    image: userData.avatar_url,
  }), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}
