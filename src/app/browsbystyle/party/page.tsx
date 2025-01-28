"use client";
import React, { useState, useEffect } from "react";
import Filter from "./filter"; // Import Filter Component
import { MdKeyboardArrowDown } from "react-icons/md";
import { BreadcrumbWithCustomSeparator } from "./breadcrumbs";
import { DrawerDemo } from "./drawer";
import { PaginationDemo } from "./pignation";
import Link from "next/link"; // Import Link from Next.js
import Image from "next/image"; // Import Image from Next.js

// Define the Product type based on your new API
type Product = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  discountPercent: number;
  rating: number;
  category: string;
  isNew: boolean;
  colors: string[];
  sizes: string[];
};

const CasualSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/allproducts");
        const data = await response.json();
        setProducts(
          data.allProducts.filter(
            (product: Product) => product.category === "casual",
          ),
        ); // Filter casual products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="container mx-auto py-12 px-4 md:px-12 max-w-full overflow-x-hidden">
      <BreadcrumbWithCustomSeparator />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="hidden sm:block">
          <Filter />
        </div>

        <div className="col-span-1 md:col-span-2 mx-auto md:mr-10 flex flex-col items-center relative">
          <div className="flex items-center justify-between w-full space-x-2 text-sm sm:text-base">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-0 lg:space-x-[250px]">
              <h2 className="text-xl md:text-3xl font-bold mb-1 sm:mb-0">
               Party
              </h2>
              <span className="text-black/60 text-xs sm:text-base">
                Showing 1-{products.length} of {products.length} Products
              </span>
            </div>
            <p className="hidden sm:flex items-center text-black/60 space-x-1">
              Sort by:
              <span className="text-black font-semibold">Most Popular</span>
              <button className="text-black font-semibold cursor-pointer">
                <MdKeyboardArrowDown />
              </button>
            </p>
          </div>

          <div className="sm:hidden absolute top-0 right-0">
            <DrawerDemo />
          </div>

          {/* Grid Layout with 2 columns on mobile and 3 columns on larger screens */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full px-2 sm:px-4">
            {loading ? (
              <p className="text-center text-lg md:text-xl">Loading...</p>
            ) : (
              products.map((product) => (
                <Link key={product._id} href={`/productdetail/${product._id}`}>
                  <div className="p-2 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="w-full h-40 sm:h-44 mb-4 relative">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={400} // Example width
                        height={200} // Example height
                        className="rounded-lg w-full h-full object-cover max-w-full"
                      />
                    </div>

                    <div className="p-2">
                      <h3 className="font-semibold text-sm md:text-base truncate">
                        {product.name}
                      </h3>
                      <div className="flex justify-start items-center mt-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <svg
                            key={index}
                            className={`w-4 h-4 md:w-5 md:h-5 ${
                              index < product.rating
                                ? "text-[#FFC633]"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              fillRule="evenodd"
                              d="M10 15.27l5.18 3.73-1.64-6.91L18 7.6l-6.92-.59L10 0 8.92 7.01 2 7.6l4.46 4.49-1.64 6.91L10 15.27z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                        <span className="ml-1 md:ml-2 text-xs md:text-sm">
                          {product.rating}/5
                        </span>
                      </div>

                      <div className="flex items-center justify-start mt-2 space-x-2">
                        <p className="text-black font-semibold text-sm md:text-lg">
                          ${product.price}
                        </p>
                        {product.discountPercent > 0 && (
                          <span className="text-[#FF3333] font-medium text-xs py-1 px-2 bg-[#FF33331A] rounded-full">
                            {product.discountPercent}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* Divider Line */}
          <div className="border-t my-4 sm:my-6 lg:my-8 w-full"></div>
        </div>
      </div>
      <div className="flex justify-end items-end mt-2">
        <PaginationDemo />
      </div>
    </section>
  );
};

export default CasualSection;
