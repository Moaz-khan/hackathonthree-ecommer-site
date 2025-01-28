"use client";

import * as React from "react";
import { SlidersHorizontalIcon } from "lucide-react";
import { MdKeyboardArrowRight, MdKeyboardArrowUp } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { client } from "../../../sanity/lib/client"; // Import your Sanity client

const Filter = ({
  categories,
  colors,
  sizes,
}: {
  categories: string[];
  colors: string[];
  sizes: string[];
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6 w-full max-w-md mx-auto overflow-y-auto h-[calc(100vh-120px)] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%]">
        {/* Filter Title and Icon */}
        <div className="flex flex-row justify-between items-center">
          <span className="font-semibold text-2xl text-gray-800">Filters</span>
          <RxCross2
            className="w-7 h-7 text-gray-600 cursor-pointer hover:text-black transition-all duration-300"
            onClick={handleClose}
          />
        </div>
        <div className="w-full h-px bg-gray-300 my-4"></div>

        {/* Category Section */}
        <div className="text-xl font-semibold mb-4 text-gray-700">Category</div>
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-3 text-sm text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer transition-all duration-200">
            <span>{category}</span>
            <MdKeyboardArrowRight className="text-gray-600 w-5 h-5" />
          </div>
        ))}
        <div className="w-full h-px bg-black/20 my-3"></div>

        {/* Color Filter Section */}
        <div className="text-xl font-semibold mb-4 text-gray-700">
          <span>Colors</span>
        </div>
        <div className="grid grid-cols-5 gap-3 mb-4">
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm transition-all duration-300 hover:border-gray-500"
              style={{
                backgroundColor: color,
              }}></div>
          ))}
        </div>
        <div className="w-full h-px bg-black/20 my-3"></div>

        {/* Size Filter Section */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-xl text-gray-700">Size</span>
            <MdKeyboardArrowUp className="text-gray-600 w-5 h-5 cursor-pointer hover:text-black transition-all duration-300" />
          </div>
          <div className="flex flex-wrap gap-3">
            {sizes.map((size, index) => (
              <div
                key={index}
                className="py-2 px-4 bg-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-300 cursor-pointer transition-all duration-200">
                {size}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h-px bg-black/20 my-3"></div>
      </div>
    )
  );
};

export function DrawerDemo() {
  const [categories, setCategories] = React.useState<string[]>([]);
  const [colors, setColors] = React.useState<string[]>([]);
  const [sizes, setSizes] = React.useState<string[]>([]);

  type Product = {
    category: string;
    colors: string[];
    sizes: string[];
  };

  React.useEffect(() => {
    const fetchFilters = async () => {
      const data: Product[] = await client.fetch(
        `*[_type == "product"]{
          category,
          colors,
          sizes
        }`,
      );

      const allCategories = Array.from(
        new Set(data.map((item: Product) => item.category)),
      );
      const allColors = Array.from(
        new Set(data.flatMap((item: Product) => item.colors)),
      );
      const allSizes = Array.from(
        new Set(data.flatMap((item: Product) => item.sizes)),
      );

      setCategories(allCategories);
      setColors(allColors);
      setSizes(allSizes);
    };

    fetchFilters();
  }, []);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontalIcon className="w-6 h-6 text-gray-600 rotate-90" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerDescription>
              Choose your preferred filters.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-6 pb-0 overflow-y-auto">
            <Filter categories={categories} colors={colors} sizes={sizes} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
