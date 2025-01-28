import { client } from "../../../sanity/lib/client"; // Sanity client import
import { NextRequest, NextResponse } from "next/server"; // Use NextRequest and NextResponse for Next.js 14

// Define types for incoming request data
interface CustomerDetails {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
}

interface CartItem {
  id: string;
  quantity: number;
  price: number;
}

interface OrderData {
  customerDetails: CustomerDetails;
  cartItems: CartItem[];
  shippingCharges: number;
  paymentMethod: string;
}

export async function POST(req: NextRequest) {
  try {
    // Use type assertion to specify the expected structure of the request body
    const {
      customerDetails,
      cartItems,
      shippingCharges,
      paymentMethod,
    }: OrderData = await req.json();

    // Log the incoming data
    console.log("Received order data:", {
      customerDetails,
      cartItems,
      shippingCharges,
      paymentMethod,
    });

    // Check if all necessary data is provided
    if (!customerDetails || !cartItems || !shippingCharges || !paymentMethod) {
      console.error("Missing data in request body");
      return NextResponse.json(
        { message: "Missing data in request body" },
        { status: 400 },
      );
    }

    // Create customer in Sanity
    console.log("Creating customer in Sanity...");
    const customer = await client.create({
      _type: "customer",
      name: customerDetails.name,
      email: customerDetails.email,
      address: customerDetails.address,
      phoneNumber: customerDetails.phoneNumber,
    });
    console.log("Customer created:", customer);

    // Create order in Sanity
    console.log("Creating order in Sanity...");
    const order = await client.create({
      _type: "order",
      customerId: customer._id,
      items: cartItems.map((item) => ({
        _type: "orderItem",
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount:
        cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        ) + shippingCharges,
      paymentMethod,
      status: "pending",
    });
    console.log("Order created:", order);

    // Return success response
    return NextResponse.json({ order });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Error creating order." },
      { status: 500 },
    );
  }
}
