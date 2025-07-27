import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Mock authentication - replace with your actual authentication logic
    // For now, we'll accept any username/password combination
    if (username && password) {
      // Mock user data - replace with actual database lookup
      const user = {
        id: 23,
        username: username,
        email: `${username}@example.com`,
        bio: "This is my bio.",
        createdAt: "2025-06-17T15:21:10.353Z",
        admin: false,
      };

      // Set session cookie (you can implement your own session management)
      const response = NextResponse.json({
        message: "Login successful",
        user: user,
      });

      // Set a session cookie
      response.cookies.set("session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    } else {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
