// app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { client } from "../../../sanity/lib/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ message: "Query is required" }, { status: 400 });
  }

  try {
    const data = await client.fetch(
      `*[_type == "product" && name match "${q}*" || description match "${q}*"]{
        _id,
        name,
        description,
        price,
        "imageUrl": image.asset->url,
        category,
        discountPercent,
        "isNew": new,
        colors,
        sizes
      }`,
    );

    return NextResponse.json(data, { status: 200 });
  } catch {
    // Error variable ko hata diya, kyunki use nahi ho raha
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 },
    );
  }
}
