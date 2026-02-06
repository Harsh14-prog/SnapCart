import { auth } from "../../../../auth";
import connectDb from "../../../../lib/db";
import Order from "../../../../models/order.model";
import user from "../../../../models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();

    const session = await auth();

    
    if (!session || !session.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const orders = await Order.find({
      user: session.user.id,
    })
    .populate("user")

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("MY ORDERS ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
