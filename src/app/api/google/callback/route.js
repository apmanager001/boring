import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    console.log("Frontend SSO callback received, redirecting to backend");

    // Get the current URL with all parameters and redirect to backend
    const url = new URL(request.url);
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://api.boringsquirrel.com";
    const backendCallbackUrl = `${backendUrl}/google/callback${url.search}`;

    console.log("Redirecting to backend SSO callback:", backendCallbackUrl);

    return NextResponse.redirect(backendCallbackUrl);
  } catch (error) {
    console.error("Frontend SSO callback error:", error);
    return NextResponse.redirect(
      `${
        process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3001"
      }/login?error=callback_failed&message=${encodeURIComponent(
        error.message
      )}`
    );
  }
}
