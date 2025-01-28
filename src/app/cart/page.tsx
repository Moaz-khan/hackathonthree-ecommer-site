"use client";
import React, { useState, useEffect } from "react";
import { client } from "../../sanity/lib/client"; // Import your sanity client
import { BreadcrumbWithCustomSeparator } from "./breadcrumbs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import Image from "next/image";

// CartItem structure
interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 0, name: "", image: "", price: 0, size: "", color: "", quantity: 0 },
  ]);

  const [shippingCharges] = useState<number>(50);
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  // Load cart data directly from API (no localStorage)
  useEffect(() => {
    fetchCartData(); // Immediately call to fetch cart data when page loads
  }, []); // Only run once when the component mounts

  const fetchCartData = async () => {
    try {
      const res = await fetch("/api/cart");
      if (res.ok) {
        const cartData: CartItem[] = await res.json();
        const filteredCartData = cartData.filter(
          (item) => item.name && item.price > 0,
        ); // Remove empty or invalid items
        setCartItems(filteredCartData);
      } else {
        console.error("Failed to fetch cart data");
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const deleteCartItem = async (id: number) => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        // Agar item delete ho jaye
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart); // State ko update karte hain
      } else {
        const errorData = await res.json();
        console.error("Delete failed:", errorData.message);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const incrementQuantity = (id: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );
    setCartItems(updatedCart); // Update the state with incremented quantity
  };

  const decrementQuantity = (id: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );
    setCartItems(updatedCart); // Update the state with decremented quantity
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    return subtotal * 0.1; // 10% discount
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    return subtotal - discount + shippingCharges;
  };

  const createCustomerAndOrder = async () => {
    try {
      // Create customer in Sanity
      const customer = await client.create({
        _type: "customer",
        name: customerDetails.name,
        email: customerDetails.email,
        address: customerDetails.address,
        phoneNumber: customerDetails.phoneNumber,
      });

      // Save each cart item as an orderItem in Sanity
      const orderItems = await Promise.all(
        cartItems.map(async (item) => {
          return await client.create({
            _type: "orderItem",
            productId: { _type: "reference", _ref: item.id },
            image: item.image,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            price: item.price,
          });
        }),
      );

      // Create the order in Sanity with references to orderItems
      const order = await client.create({
        _type: "order",
        customerId: { _type: "reference", _ref: customer._id },
        items: orderItems.map((item) => ({
          _type: "reference",
          _ref: item._id,
        })),
        totalAmount: calculateTotal(),
        paymentMethod,
        status: "pending",
        orderDate: new Date().toISOString(),
      });

      alert(`Order created successfully! Order ID: ${order._id}`);

      // Clear cart items and customer details after order creation
      setCartItems([]); // Clear cart state
      setCustomerDetails({
        name: "",
        email: "",
        address: "",
        phoneNumber: "",
      });
      setPaymentMethod(""); // Reset payment method to empty
    } catch (error) {
      console.error("Error creating customer or order:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-4 md:p-8 bg-white">
      <div className="p-2">
        <BreadcrumbWithCustomSeparator />
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold font-sans mb-4 p-2">
        YOUR CART
      </h1>
      <div className="flex flex-col md:flex-row gap-6 md:gap-12">
        <div className="w-full md:w-2/3 p-4 md:p-6 bg-white border rounded-lg shadow-md">
          <ScrollArea className="h-72 md:h-[350px]">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 my-4 border-b pb-4">
                  <div className="relative w-[124px] h-[124px] rounded-lg items-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={124}
                      height={124}
                      className="absolute left-[-1px] object-cover rounded"
                    />
                  </div>
                  <div className="flex flex-col justify-center w-full gap-2">
                    <div className="text-lg md:text-xl font-bold">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-700">
                      Size: {item.size}
                    </div>
                    <div className="text-sm text-gray-700">
                      Color: {item.color}
                    </div>
                    <div className="text-lg md:text-xl font-semibold text-gray-900">
                      ${item.price}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrementQuantity(item.id)}
                        className="text-xl text-gray-700">
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(item.id)}
                        className="text-xl text-gray-700">
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteCartItem(item.id)} // API call ke liye
                    className="text-red-500 font-semibold">
                    <MdOutlineRemoveShoppingCart />
                  </button>
                </div>
              ))
            )}
          </ScrollArea>
        </div>

        <div className="w-full md:w-1/3 p-4 md:p-6 bg-white border rounded-lg shadow-md flex flex-col justify-between h-full">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Order Summary</h2>
          {/* Customer details input */}
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={customerDetails.name}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  name: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={customerDetails.email}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  email: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Address</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={customerDetails.address}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  address: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Phone Number</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={customerDetails.phoneNumber}
              onChange={(e) =>
                setCustomerDetails({
                  ...customerDetails,
                  phoneNumber: e.target.value,
                })
              }
              required
            />
          </div>

          {/* Payment Method Form */}
          <h2 className="text-xl md:text-2xl font-bold mb-4">Payment Method</h2>
          <div>
            <label className="block mb-2">Select Payment Method</label>
            <select
              className="w-full p-2 border rounded"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="">Select a method</option>
              <option value="cash_on_delivery">Cash on Delivery</option>
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="online_banking">
                Online Banking (e.g., JazzCash)
              </option>
            </select>
          </div>
          {/* Order Total Calculation */}
          <div className="mt-4">
            <div className="flex justify-between mb-2 font-bold">
              <span>Subtotal</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-bold">Discount</span>
              <span className="text-red-500 font-bold">
                -${calculateDiscount().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-bold">Shipping Charges</span>
              <span className="font-bold">${shippingCharges.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total Amount</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              className="w-full bg-black text-white py-2 px-4 rounded-full"
              onClick={createCustomerAndOrder}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
