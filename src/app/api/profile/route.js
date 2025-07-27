import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Check if user is authenticated via session cookie
    const sessionCookie = request.cookies.get("session");

    // If you have a session cookie, validate it here
    if (!sessionCookie || sessionCookie.value !== "authenticated") {
      return NextResponse.json(
        { error: "No user logged in." },
        { status: 404 }
      );
    }

    // Mock user data - replace with your actual user data from database
    // In a real app, you'd get the user ID from the session and look up the user
    const user = {
      id: 23,
      username: "demo_user",
      email: "demo@example.com",
      bio: "This is my bio.",
      createdAt: "2025-06-17T15:21:10.353Z",
      admin: false,
    };

    return NextResponse.json(user);
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
    const body = await request.json();

    // Handle profile updates here
    // For now, just return success
    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
