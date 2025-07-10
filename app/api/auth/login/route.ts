import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import qs from "querystring";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const FormData = qs.stringify({
    username,
    password,
  });
  try {
    const response = await axios.post(
      " http://127.0.0.1:8000/auth/token",
      FormData,
      {
        headers: { "Content-type": "application/x-www-form-urlencoded" },
      }
    );
    const token = response.data.access_token;
    (await cookies()).set("Token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return NextResponse.json({
      success: true,
      username,
      token,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "invalid credentials",
      },
      {
        status: 401,
      }
    );
  }
}
