import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import qs from "querystring";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  // Convert data to application/x-www-form-urlencoded
  const formData = qs.stringify({
    username,
    password,
  });

  try {
    // Make a POST request to FastAPI backend
    const response = await axios.post(
      "https://backend-1-fmwc.onrender.com/auth/token", // Deployed backend route
      formData,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const token = response.data.access_token;

    // Store token in cookie (httpOnly)
    (await cookies()).set("Token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    return NextResponse.json({
      success: true,
      username,
      token,
    });
  } catch (error: unknown) {
    let message = "Login failed";

    if (axios.isAxiosError(error)) {
      console.error("Login failed:", error.response?.data || error.message);
      message = error.response?.data?.detail || error.message;
    } else {
      console.error("Unexpected error during login:", error);
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
