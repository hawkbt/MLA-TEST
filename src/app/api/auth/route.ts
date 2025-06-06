import { encrypt } from "@/utils/session";
import { cookies } from "next/headers";

export async function POST() {
  const data = new FormData();
  data.append("grant_type", "authorization_code");
  data.append("client_id", process.env.CLIENT_ID!);
  data.append("client_secret", process.env.CLIENT_SECRET!);
  data.append("code", process.env.AUTH_CODE!);
  data.append("redirect_uri", "https://www.google.com");
  const response = await fetch(`${process.env.API_URL}/oauth/token`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const resJson: Promise<{ access_token: string; refresh_token: string }> = await response.json();
  const { access_token, refresh_token } = await resJson;
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ token: access_token, refresh: refresh_token, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "strict",
    path: "/",
  });

  return new Response(JSON.stringify(resJson), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
