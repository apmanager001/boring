import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Get all cookies from the request
    const cookies = request.cookies;

    // Proxy the request to the backend
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://api.boringsquirrel.com";
    const backendProfileUrl = `${backendUrl}/profile`;

    // Forward all cookies to the backend
    const cookieHeader = Array.from(cookies.entries())
      .map(([name, cookie]) => `${name}=${cookie.value}`)
      .join("; ");

    const response = await fetch(backendProfileUrl, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "No user logged in." },
        { status: 404 }
      );
    }

    const userData = await response.json();
    return NextResponse.json(userData);
  } catch (error) {
    console.error("Profile API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();

    // Proxy the request to the backend
    const backendUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://api.boringsquirrel.com";
    const backendProfileUrl = `${backendUrl}/profile`;

    // Forward all cookies to the backend
    const cookies = request.cookies;
    const cookieHeader = Array.from(cookies.entries())
      .map(([name, cookie]) => `${name}=${cookie.value}`)
      .join("; ");

    const response = await fetch(backendProfileUrl, {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
