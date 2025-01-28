"use client"
import React, { useEffect, useState } from "react";
import { SlidersHorizontalIcon } from "lucide-react";
import { MdKeyboardArrowRight, MdKeyboardArrowUp } from "react-icons/md";

// Sanity client import
import sanityClient from "@sanity/client";

const client = sanityClient({
  projectId: "ncvvt2jg", // Replace with your Sanity Project ID
  dataset: "production", // Replace with your dataset name
  apiVersion: "2025-01-17", // Sanity API version
  useCdn: true,
});

// Define Product interface
interface Product {
  category?: string;
  colors?: string[];
  sizes?: string[];
}

const Filter = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Fetch data from Sanity
  useEffect(() => {
    const fetchData = async () => {
      const result: Product[] = await client.fetch(
        `*[_type == "product"]{
          category,
          colors,
          sizes
        }`,
      );

      const uniqueCategories = Array.from(
        new Set(result.flatMap((item) => item.category || [])),
      );
      const uniqueColors = Array.from(
        new Set(result.flatMap((item) => item.colors || [])),
      );
      const uniqueSizes = Array.from(
        new Set(result.flatMap((item) => item.sizes || [])),
      );

      setCategories(uniqueCategories);
      setColors(uniqueColors);
      setSizes(uniqueSizes);
    };

    fetchData();
  }, []);

  // Event Handlers
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleColorClick = (color: string) => {
    setSelectedColor(color === selectedColor ? null : color);
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size === selectedSize ? null : size);
  };

  const handleApplyFilters = () => {
    console.log("Applied Filters:", {
      category: selectedCategory,
      color: selectedColor,
      size: selectedSize,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 space-y-4 w-auto">
      {/* Filter Title */}
      <div className="flex justify-between items-center">
        <span className="font-semibold text-xl">Filters</span>
        <SlidersHorizontalIcon className="w-6 h-6 text-gray-600 rotate-90" />
      </div>
      <div className="w-full h-px bg-gray-300 my-4"></div>

      {/* Categories */}
      <div className="text-lg font-semibold mb-2">Category</div>
      {categories.map((category, index) => (
        <div
          key={index}
          className={`flex justify-between items-center py-2 text-sm ${
            selectedCategory === category
              ? "text-black font-bold"
              : "text-gray-600"
          } cursor-pointer`}
          onClick={() => handleCategoryClick(category)}>
          <span>{category}</span>
          <MdKeyboardArrowRight className="w-5 h-5" />
        </div>
      ))}
      <div className="w-full h-px bg-black/20 my-2"></div>

      {/* Colors */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-xl">Colors</span>
          <MdKeyboardArrowUp className="text-gray-600 w-5 h-5" />
        </div>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`w-7 h-7 rounded-full cursor-pointer ${
                selectedColor === color
                  ? "border-4 border-black"
                  : "border-2 border-gray-400"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorClick(color)}></div>
          ))}
        </div>
      </div>
      <div className="w-full h-px bg-black/20 my-2"></div>

      {/* Sizes */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-xl">Size</span>
          <MdKeyboardArrowUp className="text-gray-600 w-5 h-5" />
        </div>
        <div className="flex flex-wrap gap-3">
          {sizes.map((size, index) => (
            <div
              key={index}
              className={`py-2 px-4 rounded-full cursor-pointer ${
                selectedSize === size
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => handleSizeClick(size)}>
              {size}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-px bg-black/20 my-2"></div>

      {/* Apply Filters Button */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handleApplyFilters}
          className="bg-black text-white w-[247px] h-[48px] rounded-full">
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
