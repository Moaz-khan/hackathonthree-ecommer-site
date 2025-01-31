import { NextRequest, NextResponse } from "next/server";

// Cart item type define karein
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// In-memory cart data (for development/testing)
let cart: CartItem[] = [];

// Helper function to read cart data (memory-based)
const readCartData = (): CartItem[] => {
  return cart;
};
console.log(readCartData);

// Helper function to write cart data (memory-based)
const writeCartData = (data: CartItem[]) => {
  cart = data;
};

export async function GET() {
  return NextResponse.json(cart, { status: 200 });
}

export async function POST(req: NextRequest) {
  const newItem: CartItem = await req.json();
  const existingIndex = cart.findIndex((item) => item.id === newItem.id);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += newItem.quantity;
  } else {
    cart.push(newItem);
  }

  writeCartData(cart);
  return NextResponse.json({ message: "Item added", cart }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { id }: { id: string } = await req.json();
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  const filteredCart = cart.filter((item) => item.id !== id);

  if (filteredCart.length === cart.length) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  writeCartData(filteredCart);

  return NextResponse.json(
    { message: "Item removed", cart: filteredCart },
    { status: 200 },
  );
}
