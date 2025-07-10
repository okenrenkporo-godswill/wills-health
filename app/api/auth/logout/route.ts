import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    (await cookies()).delete("Token");

    return NextResponse.json({
      success: true,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Logout error:", error.message);
    } else {
      console.error("Unexpected logout error:", error);
    }

    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
