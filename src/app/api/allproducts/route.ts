type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  discountPercent: number;
  isNew: boolean;
  colors: string[];
  sizes: string[];
  category:string[],
  rating: number;
};

import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

// Global variable to store real-time products
let allProducts: Product[] = [];

// Function to fetch initial products and set up real-time listener
async function fetchAndListenProducts() {
  try {
    // Fetch initial data
    const data = await client.fetch(`*[_type == "product"]{
      _id,
      name,
      description,
      price,
      "imageUrl": image.asset->url,
      discountPercent,
      "isNew": new,
      colors,
      category,
      sizes
    }`);

    allProducts = data;

    // Set up real-time listener
    client.listen(`*[_type == "product"]`).subscribe((update) => {
      console.log("Real-time update:", update);

      // Fetch updated products list after any change
      fetchAndListenProducts();
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Initial fetch and listen setup
fetchAndListenProducts();

export async function GET() {
  try {
    return NextResponse.json({ allProducts });
  } catch (error) {
    console.error("Error returning products:", error);
    return NextResponse.json(
      { message: "Error returning products" },
      { status: 500 },
    );
  }
}
