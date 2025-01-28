"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";
import Link from "next/link";
import { BreadcrumbWithCustomSeparator } from "./breadcrumbs";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
  category?: string;
  discountPercent?: number;
  isNew?: boolean;
}

export default function BrandPage() {
  const pathname = usePathname(); // Get the current path
  const brandName = pathname?.split("/")[2]; // Assuming the URL structure is /brands/[brandName]

  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from Sanity
  useEffect(() => {
    async function fetchProducts() {
      try {
        const query = `*[_type == "product"]{
          _id,
          name,
          "imageUrl": image.asset->url,
          price,
          description,
          category,
          discountPercent,
          "isNew": new
        }`;
        const allProducts: Product[] = await client.fetch(query);

        // Shuffle and pick 9 random products
        const shuffledProducts = allProducts.sort(() => 0.5 - Math.random());
        setProducts(shuffledProducts.slice(0, 9));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 p-11">
      <BreadcrumbWithCustomSeparator pageName={`${brandName}`}/>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
        {brandName ? `${brandName.toLocaleUpperCase()}!` : "Brand Not Found"}
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        {brandName
          ? `Browse the latest collection from ${brandName}.`
          : "Please select a valid brand."}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl group-hover:scale-220 transition-transform duration-300">
        {products.map((product) => (
          <Link key={product._id} href={`/productdetail/${product._id}`}>
            <div className="bg-white p-5 rounded-lg shadow-md relative group hover:shadow-lg transition-shadow duration-300">
              {product.discountPercent != null &&
                product.discountPercent > 0 && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-md font-medium">
                    {product.discountPercent}% OFF
                  </span>
                )}

              <Image
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
                width={400}
                height={400}
              />
              {product.isNew && (
                <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full mb-2">
                  New
                </span>
              )}
              <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
                {product.name}
              </h3>
              {product.category && (
                <p className="text-sm text-gray-500 mb-2">
                  Category: {product.category}
                </p>
              )}
              <p className="text-lg font-medium text-gray-800">
                ${product.price.toFixed(2)}{" "}
                {product.discountPercent && product.discountPercent > 0 && (
                  <span className="line-through text-gray-400 text-sm">
                    $
                    {(
                      product.price /
                      (1 - product.discountPercent / 100)
                    ).toFixed(2)}
                  </span>
                )}
              </p>
              <p>{`Product By ${brandName}`} </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
