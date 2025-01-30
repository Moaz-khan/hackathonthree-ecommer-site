"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LiaStarSolid } from "react-icons/lia";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ButtonDemo } from "../button";
import { Counter } from "../counter";
import Reviews from "../reviwes";
import YouMightAlsoLike from "../youmightlikealso";
import { BreadcrumbWithCustomSeparator } from "../breadcrumbs";
import { useRouter } from "next/navigation";

interface Product {
  _id: number;
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
  original_price?: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  discountPercent: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
}

const getProductData = async (id: string): Promise<Product | null> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}api/allproducts`,
    {
      cache: "no-cache",
    },
  );
  if (!res.ok) {
    return null;
  }
  const data = await res.json();
  return (
    data.allProducts.find(
      (product: Product) => product._id.toString() === id,
    ) || null
  );
};

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [count, setCount] = useState<number>(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const productData = await getProductData(params.id);
      if (!productData) {
        notFound();
      } else {
        setProduct({
          ...productData,
          // Assigning a random rating (between 1 and 5) to the product
          rating: Math.floor(Math.random() * 5) + 1,
        });
      }
    };

    fetchData();
  }, [params.id]);

  useEffect(() => {
    const storedCart = localStorage.getItem(`${process.env.NEXT_PUBLIC_SITE_URL}cart`);
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      alert("Please select both color and size.");
      return;
    }

    const updatedCart = [...cartItems];
    const existingProductIndex = updatedCart.findIndex(
      (item) =>
        item.id === product._id &&
        item.color === selectedColor &&
        item.size === selectedSize,
    );

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity += count;
    } else {
      const newItem: CartItem = {
        id: product._id,
        name: product.name,
        price: product.price,
        discountPercent: product.discountPercent,
        quantity: count,
        image: product.imageUrl,
        color: selectedColor,
        size: selectedSize,
      };
      updatedCart.push(newItem);
    }

    // Saving updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);

    alert(`${count} item${count > 1 ? "s" : ""} added to your cart`);

    try {
      console.log("Sending to backend:", updatedCart);
      const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: product._id,
          quantity: count,
          name: product.name,
          price: product.price,
          discountPercent: product.discountPercent,
          image: product.imageUrl,
          color: selectedColor,
          size: selectedSize,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update cart in API");
      }

      const data = await response.json();
      console.log("API Response:", data);
      router.push(`${process.env.NEXT_PUBLIC_SITE_URL}cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    }
  };

  return (
    <div>
      <div className="overflow-x-hidden">
        <div className="mt-12 px-4 sm:px-8 lg:px-16 h-auto">
          <BreadcrumbWithCustomSeparator />

          <Card className="bg-white rounded-lg p-4 border-l-white border-r-white">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              <div className="flex flex-col sm:flex-row-reverse gap-4 w-full sm:w-1/2">
                <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[515px]">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    className="rounded-lg"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>

              <div className="w-full sm:w-1/2">
                <CardContent className="p-2">
                  <div className="text-start">
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-black mb-4">
                      {product.name}
                    </h1>
                    <div className="flex justify-start items-center mb-4">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <LiaStarSolid
                          key={index}
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${index < product.rating ? "text-[#FFC633]" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-2 text-sm sm:text-base text-gray-500">
                        {product.rating}/5
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xl sm:text-2xl font-bold text-black">
                        ${product.price}
                      </span>
                      {product.original_price && product.original_price > 0 && (
                        <span className="text-xl sm:text-2xl font-bold text-gray-400 line-through">
                          ${product.original_price}
                        </span>
                      )}
                      {product.discountPercent > 0 && (
                        <span className="text-[#FF3333] font-medium text-xs py-[2px] px-[8px] bg-[#FF33331A] rounded-full">
                          {product.discountPercent}%
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base font-normal text-gray-600 mb-4">
                      {product.description ||
                        "This is a placeholder description."}
                    </p>
                    <div className="border-t border-gray-300 my-4"></div>
                    <div className="mb-4">
                      <span className="text-sm sm:text-base font-normal text-gray-600 mb-2">
                        Select Color
                      </span>
                      <div className="flex sm:gap-4">
                        {product.colors.map((color, index) => (
                          <div
                            key={index}
                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full cursor-pointer border border-black border-1 ${selectedColor === color ? "ring-2 ring-blue-500" : ""}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setSelectedColor(color)}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-gray-300 my-4"></div>
                    <div className="flex flex-col gap-4 mb-4">
                      <span className="text-sm sm:text-base font-normal text-gray-600">
                        Choose Size
                      </span>
                      <div className="flex gap-2 sm:gap-4">
                        {product.sizes.map((size, index) => (
                          <button
                            key={index}
                            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium ${selectedSize === size ? "bg-black text-white" : "bg-gray-200 text-gray-600"}`}
                            onClick={() => setSelectedSize(size)}>
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-gray-300 my-4"></div>
                    <div className="flex justify-between items-center mt-4">
                      <Counter onChange={(value) => setCount(value)} />
                      <ButtonDemo
                        label="Add to Cart"
                        onClick={handleAddToCart}
                      />
                    </div>
                    <div className="border-t border-gray-200 my-4"></div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
        <Reviews />
        <YouMightAlsoLike />
      </div>
    </div>
  );
};

export default ProductDetailPage;
