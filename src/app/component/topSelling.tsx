"use client";
import useSWR, { mutate } from "swr";
import { Card, CardContent } from "@/components/ui/card";
import { LiaStarSolid } from "react-icons/lia";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function TopSelling() {
  const { data, error } = useSWR("/api/allproducts", fetcher, {
    revalidateOnFocus: false, // Window focus par refetch na ho
    refreshInterval: 0, // Disable automatic refresh
  });
  type Product = {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    discountPercent: number;
    rating: number;
  };
  const [ratings, setRatings] = useState<Record<string, number>>({}); // Local state for ratings

  useEffect(() => {
    const subscription = client
      .listen(`*[_type == "product"]`)
      .subscribe(() => {
        console.log("New product detected! Fetching again...");
        mutate("/api/allproducts");
      });

    return () => subscription.unsubscribe();
  }, []);

  if (error) return <p>Failed to load</p>;
  if (!data) return <p>Loading products...</p>;

  // Display only 4 products from the API response
  const topSelling = data.allProducts.slice(4, 8);

  // Handle the rating change
  const handleRatingChange = (productId: string, rating: number) => {
    setRatings((prevRatings: Record<string, number>) => ({
      ...prevRatings,
      [productId]: rating,
    }));
  };
  return (
    <div className="mt-12 px-4 sm:px-8 lg:px-16">
      <h2 className="text-center font-integral font-extrabold text-3xl sm:text-4xl md:text-5xl mb-8">
        TOP SELLING
      </h2>

      <div className="relative">
        <ScrollArea className="w-full overflow-x-auto">
          <div className="flex space-x-4 p-4">
            {topSelling.length > 0 ? (
              topSelling.map((product: Product) => {
                const currentRating = ratings[product._id] || 5; // Default to 0 if no rating is set
                return (
                  <div key={product._id} className="w-[320px] flex-shrink-0">
                    <Link href={`/productdetail/${product._id}`}>
                      <Card className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="w-full h-[280px] mb-4 relative">
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
                            <h3 className="font-semibold text-base sm:text-lg line-clamp-1">
                              {product.name}
                            </h3>
                            <div className="flex justify-start items-center mt-2">
                              {/* Manual rating component */}
                              {Array.from({ length: 5 }).map((_, index) => (
                                <LiaStarSolid
                                  key={index}
                                  className={`w-[16px] h-[16px] ${
                                    index < currentRating
                                      ? "text-[#FFC633]"
                                      : "text-gray-300"
                                  } cursor-pointer`}
                                  onClick={() =>
                                    handleRatingChange(product._id, index + 1)
                                  }
                                />
                              ))}
                              <span className="ml-2 text-sm">
                                {currentRating}/5
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
                );
              })
            ) : (
              <p>No new arrivals found.</p>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="flex justify-center items-center mt-16">
        <Link href={"/newArrivals"}>
          <button className="flex justify-center items-center border border-gray-500 font-semibold w-[218px] h-[52px] hover:bg-black hover:text-white rounded-full">
            View All
          </button>
        </Link>
      </div>
    </div>
  );
}
