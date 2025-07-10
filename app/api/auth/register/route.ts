import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

type RegisterResponse = {
  access_token: string;
  username: string;
};

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  try {
    const response = await axios.post<RegisterResponse>(
      "https://backend-1-fmwc.onrender.com/auth/signup",
      {
        username,
        password,
      },
      {
        headers: { "Content-Type": "application/json" },
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
      username: response.data.username,
      token,
    });
  } catch (err: unknown) {
    let message = "Invalid credentials or server error";

    if (axios.isAxiosError(err)) {
      message = err.response?.data?.error || err.message;
      console.error("Register error:", err.response?.data || err.message);
    } else {
      console.error("Unexpected error:", err);
    }

    return NextResponse.json({ error: message }, { status: 401 });
  }
}
