import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("/api/socket/connect API HIT");

  try {
    await connectDb();

    const { userId, socketId } = await req.json();

    if (!userId || !socketId) {
      return NextResponse.json(
        { success: false, message: "userId or socketId missing" },
        { status: 400 },
      );
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        socketId,
        isOnline: true,
      },
      { new: true },
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "user not found" },
        { status: 404 },
      );
    }

    console.log("UPDATED USER:", user._id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("SOCKET CONNECT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
