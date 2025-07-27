import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Clear session cookies or tokens here
    const response = NextResponse.json({ message: "Logged out successfully" });

    // Clear any session cookies
    response.cookies.delete("session");
    response.cookies.delete("token");

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Failed to logout" }, { status: 500 });
  }
}
