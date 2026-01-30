import { auth } from "@/auth";
import connectdb from "@/lib/db";
import userModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    await connectdb()
  try {
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { message: "User is not authenticated" },
        { status: 401 },
      );
    }

    const user = await userModel
      .findOne({ email: session.user.email })
      .select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
