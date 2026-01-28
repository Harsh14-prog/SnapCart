import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import connectdb from "@/lib/db";
import Grocery from "@/models/grocery.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectdb();

  try {
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json(
        { message: "You are not an admin" },
        { status: 403 }
      );
    }

    const formData = await req.formData();

    const name = formData.get("name")?.toString();
    const category = formData.get("category")?.toString();
    const unit = formData.get("unit")?.toString();
    const price = Number(formData.get("price"));
    const file = formData.get("image") as Blob | null;

    if (!name || !category || !unit || !price || !file) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const imageUrl = await uploadOnCloudinary(file);

    if (!imageUrl) {
      return NextResponse.json(
        { message: "Image upload failed" },
        { status: 500 }
      );
    }

    const grocery = await Grocery.create({
      name,
      category,
      unit,
      price,
      image: imageUrl,
    });

    return NextResponse.json(grocery, { status: 201 });
  } catch (error) {
    console.error("ADD GROCERY ERROR:", error);
    return NextResponse.json(
      { message: "Add grocery failed", error: String(error) },
      { status: 500 }
    );
  }
}
