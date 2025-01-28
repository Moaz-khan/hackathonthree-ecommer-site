import { NextResponse } from "next/server";

// Sample products data
const products = [
  {
    id: 1,
    name: "Product 1",
    image: "/product1.jpg",
    price: "100",
    original_price: 120,
    rating: 4,
    discount: 20,
    description: "Product 1 description",
  },
  {
    id: 2,
    name: "Product 2",
    image: "/product2.jpg",
    price: "200",
    original_price: 220,
    rating: 5,
    discount: 10,
    description: "Product 2 description",
  },
  // Add more products here
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params; // Extract product ID from route params
  const product = products.find((product) => product.id.toString() === id); // Find product by ID

  if (product) {
    return NextResponse.json(product); // Return the product data
  } else {
    return NextResponse.json({ message: "Product not found" }, { status: 404 }); // Return 404 error
  }
}
