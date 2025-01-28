"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LiaStarSolid } from "react-icons/lia";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";

interface Product {
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
  rating: number; // Add rating to Product type if it's missing
}

export function TopSelling() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/allproducts",{cache:"no-cache"})
      .then((response) => response.json())
      .then((data) => {
        // Filter products for the "topSelling" category
        const topSellingProducts = data.allProducts.filter(
          (product: Product) => product.category === "topSelling",
        );
        setProducts(topSellingProducts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="mt-12 px-4 sm:px-8 lg:px-16">
      <h2 className="text-center font-integral font-extrabold text-3xl sm:text-4xl md:text-5xl mb-8">
        TOP SELLING
      </h2>

      <div className="relative">
        {/* Display Products */}
        <ScrollArea>
          <div className="flex space-x-4 p-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="w-[320px] flex-shrink-0">
                  <Link href={`/productdetail/${product._id}`}>
                    <Card className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="w-full h-[180px] mb-4 relative">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          className="rounded-lg"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>

                      <CardContent className="p-2">
                        <div className="text-start">
                          <h3 className="font-semibold text-base sm:text-lg">
                            {product.name}
                          </h3>
                          <div className="flex justify-start items-center mt-2">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <LiaStarSolid
                                key={index}
                                className={`w-[16px] h-[16px] ${
                                  index < product.rating
                                    ? "text-[#FFC633]"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm">
                              {product.rating}/5
                            </span>
                          </div>

                          <div className="flex items-center justify-start mt-2 space-x-2">
                            <p className="text-black font-semibold text-lg">
                              ${product.price}
                            </p>
                            {product.discountPercent > 0 && (
                              <span className="text-[#FF3333] font-medium text-xs py-[2px] px-[8px] bg-[#FF33331A] rounded-full">
                                {product.discountPercent}%
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))
            ) : (
              <p>Loading products...</p>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="flex justify-center items-center mt-16">
        <Link href={"/casual"}>
          <button className="flex justify-center items-center border border-gray-500 font-semibold w-[218px] h-[52px] hover:bg-black hover:text-white rounded-full">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
}
