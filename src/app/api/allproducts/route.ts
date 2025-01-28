type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  discountPercent: number;
  isNew: boolean;
  colors: string[];
  sizes: string[];
  rating: number;
};

import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

// Category IDs
const newArrivalsIds = [
  "pNdFo0jzUh1upuRBLlqFl6",
  "pNdFo0jzUh1upuRBLlqG6C",
  "pNdFo0jzUh1upuRBLlqGWZ",
  "pNdFo0jzUh1upuRBLlqGmO",
];
const topSellingIds = [
  "pNdFo0jzUh1upuRBLlqI8m",
  "pNdFo0jzUh1upuRBLlqIjh",
  "pNdFo0jzUh1upuRBLlqLnZ",
  "pNdFo0jzUh1upuRBLlqMDw",
];
const casualIds = [
  "pNdFo0jzUh1upuRBLlqMor",
  "qQpkQmFIZ2DSQkhvXVcRXm",
  "qQpkQmFIZ2DSQkhvXVcTlO",
  "qQpkQmFIZ2DSQkhvXVcWLw",
  "rnb16y4e0BKBgYGF3PYRo3",
  "rnb16y4e0BKBgYGF3PYS7V",
];

const ratings = {
  newArrivals: 5,
  topSelling: 4,
  casual: 3,
};

// Global variable to store real-time products
let allProducts: Product[] = [];

// Function to categorize and rate products
function categorizeAndRateProducts(products: Product[]) {
  return products.map((product) => {
    let productRating: number;
    let category: string;

    if (newArrivalsIds.includes(product._id)) {
      productRating = ratings.newArrivals;
      category = "newArrivals";
    } else if (topSellingIds.includes(product._id)) {
      productRating = ratings.topSelling;
      category = "topSelling";
    } else if (casualIds.includes(product._id)) {
      productRating = ratings.casual;
      category = "casual";
    } else {
      productRating = Math.floor(Math.random() * 5) + 1;
      category = "other";
    }

    return {
      ...product,
      rating: productRating,
      category: category,
    };
  });
}

// Function to fetch initial products and set up real-time listener
async function fetchAndListenProducts() {
  try {
    // Fetch initial data
    const data = await client.fetch(`
      *[_type == "product"]{
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
      }
    `);

    allProducts = categorizeAndRateProducts(data);

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
