// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/auth/signup", // ✅ No space here
      {
        username,
        password,
      },
      {
        headers: { "Content-Type": "application/json" }, // ✅ Correct spelling
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
      username: response.data.username, // optionally include username here
      token,
    });
  } catch (error: any) {
    console.error("Register error:", error.response?.data || error.message);

    return NextResponse.json(
      {
        error: "Invalid credentials or server error",
      },
      {
        status: 401,
      }
    );
  }
}
