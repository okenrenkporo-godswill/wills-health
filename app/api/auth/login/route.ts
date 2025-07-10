import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import qs from "querystring";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const formData = qs.stringify({
    username,
    password,
  });

  try {
    const response = await axios.post(
      "https://backend-1-fmwc.onrender.com/auth/token", // removed space
      formData,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const token = response.data.access_token;

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
