import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Cart item type define karein
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// Cart data file ka path
const cartFilePath = path.resolve(process.cwd(), "cart.json");

// Helper function to read cart data from the file
const readCartData = (): CartItem[] => {
  if (fs.existsSync(cartFilePath)) {
    const fileData = fs.readFileSync(cartFilePath, "utf-8");
    return JSON.parse(fileData) as CartItem[];
  }
  return []; // Agar cart data na ho, toh empty array return karo
};

// Helper function to write cart data to the file
const writeCartData = (data: CartItem[]) => {
  fs.writeFileSync(cartFilePath, JSON.stringify(data, null, 2), "utf-8");
};

export async function GET() {
  const cart = readCartData();
  return NextResponse.json(cart, { status: 200 });
}

export async function POST(req: NextRequest) {
  const newItem: CartItem = await req.json(); // Define `newItem` as `CartItem`
  const cart = readCartData();

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
  const { id }: { id: string } = await req.json(); // Define `id` type explicitly
  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  const cart = readCartData();
  const filteredCart = cart.filter((item) => item.id !== id); // Remove item with the given id

  if (filteredCart.length === cart.length) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  writeCartData(filteredCart);

  return NextResponse.json(
    { message: "Item removed", cart: filteredCart },
    { status: 200 },
  );
}
