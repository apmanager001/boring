import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Simple redirect to backend SSO endpoint
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://api.boringsquirrel.com";
    const ssoUrl = `${backendUrl}/google`;

    console.log("Redirecting to backend SSO:", ssoUrl);

    return NextResponse.redirect(ssoUrl);
  } catch (error) {
    console.error("SSO redirect error:", error);
    return NextResponse.json(
      { error: "Failed to redirect to SSO" },
      { status: 500 }
    );
  }
}
