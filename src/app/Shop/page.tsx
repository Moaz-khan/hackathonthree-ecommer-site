"use client";
import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BreadcrumbWithCustomSeparator } from "./breadcrumbs";
import Link from "next/link";
import PaginationDemo from "./pignation";
import Image from "next/image";

// Define the Product type
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

const AllProductsSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(8);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/allproducts`,
        );
        const data = await response.json();
        setProducts(data.allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const isNextButtonDisabled = indexOfLastProduct >= filteredProducts.length;

  return (
    <section className="container py-12 px-4 md:px-12 max-w-full overflow-x-hidden">
      <BreadcrumbWithCustomSeparator />
      <div className="flex flex-col items-center">
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">SHOP</h2>
            <div className="flex items-center space-x-2 text-sm sm:text-base">
              <span className="text-black/60">
                Showing {indexOfFirstProduct + 1}-
                {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
                {filteredProducts.length} Products
              </span>
              <div className="relative">
                <select
                  className="text-black font-semibold bg-white border p-1 rounded cursor-pointer"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <MdKeyboardArrowDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {loading ? (
              <p className="text-center text-lg md:text-xl">Loading...</p>
            ) : (
              currentProducts.map((product) => (
                <Link key={product._id} href={`/productdetail/${product._id}`}>
                  <div className="p-2 sm:p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className="w-full h-40 sm:h-44 mb-4 relative">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="rounded-lg w-full h-full object-cover max-w-full"
                      />
                    </div>
                    <div className="p-2">
                      <h3 className="font-semibold text-sm md:text-base truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 truncate">
                        {product.category}
                      </p>
                      <p className="text-sm text-gray-700 mt-1 truncate">
                        {product.description}
                      </p>
                      <div className="flex justify-start items-center mt-2">
                        <span
                          className={`text-xs ${product.isNew ? "text-green-500" : "text-gray-500"}`}>
                          {product.isNew ? "New Arrival" : "Regular"}
                        </span>
                      </div>
                      <div className="flex items-center justify-start mt-2 space-x-2">
                        <p className="text-black font-semibold text-sm md:text-lg">
                          ${product.price.toFixed(2)}
                        </p>
                        {product.discountPercent > 0 && (
                          <span className="text-[#FF3333] font-medium text-xs py-1 px-2 bg-[#FF33331A] rounded-full">
                            {product.discountPercent}% Off
                          </span>
                        )}
                      </div>
                      <div className="flex justify-start items-center mt-2">
                        <span className="text-xs text-yellow-500">
                          Rating: {product.rating} / 5
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="border-t my-4 sm:my-6 lg:my-8 w-full"></div>

          <PaginationDemo
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
            onPageChange={handlePageChange}
            isNextButtonDisabled={isNextButtonDisabled}
          />
        </div>
      </div>
    </section>
  );
};

export default AllProductsSection;
