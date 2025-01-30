"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { LiaStarSolid } from "react-icons/lia";
type Product = {
  original_price: number;
  discount: number;
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  discountPercent: number;
  rating: number;
};
const url = "/api/allproducts";

const YouMightAlsoLike = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Limiting the products to only 4 items
        setProducts(data.allProducts.slice(11, 15));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="mt-12 mb-12 px-2 sm:px-4 lg:px-8">
      <h2 className="text-center font-integral font-extrabold text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">
        YOU MIGHT ALSO LIKE
      </h2>

      <div className="flex justify-around items-center overflow-x-auto space-x-2 sm:space-x-4">
        {products.map((product:Product) => (
          <div
            key={product._id}
            className="min-w-[220px] sm:min-w-[250px] p-2 sm:p-4">
            <div className="bg-white rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
              <div className="w-full h-[160px] sm:h-[180px] mb-4 relative">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="rounded-lg"
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className="p-2">
                <h3 className="font-semibold text-sm sm:text-base">
                  {product.name}
                </h3>
                <div className="flex justify-start items-center mt-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <LiaStarSolid
                      key={index}
                      className={`w-[12px] sm:w-[16px] h-[12px] sm:h-[16px] ${
                        index < product.rating
                          ? "text-[#FFC633]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-1 sm:ml-2 text-xs sm:text-sm">
                    {product.rating}/5
                  </span>
                </div>

                <div className="flex items-center justify-start mt-2 space-x-2">
                  <p className="text-black font-semibold text-sm sm:text-lg">
                    ${product.price}
                  </p>
                  {product.original_price > 0 && (
                    <p className="text-black/40 text-sm sm:text-lg font-semibold line-through">
                      ${product.original_price}
                    </p>
                  )}
                  {product.discount > 0 && (
                    <span className="text-[#FF3333] font-medium text-xs py-[1px] sm:py-[2px] px-[6px] sm:px-[8px] bg-[#FF33331A] rounded-full">
                      {product.discount}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouMightAlsoLike;
