import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allProducts = await client.fetch(`*[_type == "product"]{
      _id,
      name,
      description,
      price,
      "imageUrl": image.asset->url,
      discountPercent,
      "isNew": new,
      colors,
      sizes,
      rating
    }`);

    return NextResponse.json({ allProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 },
    );
  }
}
