import connectdb from "@/lib/db";
import user from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectdb();

    const body = await req.json();
    // console.log("BODY FROM FRONTEND:", body);
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const existUser = await user.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (err: any) {
   console.log(err.response.data);
}

}
