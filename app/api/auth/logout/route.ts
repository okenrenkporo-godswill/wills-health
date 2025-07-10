// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
  try {
    (await cookies()).delete("Token");
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Login failed:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
