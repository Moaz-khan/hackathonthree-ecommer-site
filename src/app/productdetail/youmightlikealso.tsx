"use client"
import React from "react";
import Image from "next/image";
import { LiaStarSolid } from "react-icons/lia";

const relatedProducts = [
  {
    id: 1,
    name: "Polo with Contrast Trims",
    image:
      "https://s3-alpha-sig.figma.com/img/15e6/8c10/3095df99e905b164718348af952a0f64?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TyuM2EBAh0xEbwxD49v3QHoPWWb14iiggAd-D3wO9xU-4pIp0jwm6MMdmLadaR9jiNBunm8OlnvnCddan-AhTSdQ6qvA0xYOYZG36hMULmF7QXmUw~uh6iR61pjOcpEeR4zsbev6z~qHtUGHtKw338R-vcOMSEM~KOdKi-QCsqR8ZwknqoRRw3Fi7qVC1bOZsJZ4E92BI18pybLShCWz46AS~qF2TpxvhaZBBn27eU2bVMA1M-iwhQAc6JzQqHmDF-EhBxVBZC~LGUaEtavkJcsKxD-9CWEPnkAmsYuVD2UiR30LrB7sG3Yxx~whwBkUYeNMP2tRj8Wqu8mzUqHrqg__",
    rating: 4,
    price: 212,
    original_price: 242,
    discount: 20,
  },
  {
    id: 2,
    name: "Gradient Graphic T-shirt",
    image:
      "https://s3-alpha-sig.figma.com/img/f04a/017d/b094f9a20c2328f54a31b153619784f3?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PYz1nIGjrCASMdf7sRQ4aPtlyXtBTmP2uBTw9273xuXK1volTTeVBxY2wPHVikRCBObzYEu3aTG2EV0taxOWJltrWD11VLUn9qEq7VrUMLvnO6tdeGbjv14ht~m7k7O3oJ~~-TGjgN4OJgSARY1qOFyBexVzAO3WVcU47qcFSRb0n6j-mokY5kdLY7RoJiEmp8m1V8pAqjNsZslmT~WrAdVWG9w-rzObI~I8w3w349yI8N0q2YrHZnKA5ufSqFylzqLN7-kpY5h4S-StRw6VuVhTcfSlQEz5dyeN5Jkh8JQS5AyvY77iyTPf~H2LpgD~BidUPkWhzj7GBrpJde7oPA__",
    rating: 3,
    price: 145,
    original_price: 0,
    discount: 0,
  },
  {
    id: 3,
    name: "Polo with Tipping Details",
    image:
      "https://s3-alpha-sig.figma.com/img/aecd/8196/485b30fd30b3226e09bb8f8e494c260b?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=D9ffGq2Mzj7dZ-5fGi-uOgw-IUdlHj66ldYwHtTsVtywCXqpwV~7ESjWhUnOB5TvFSzF~v1VWYrWO~AaDd4vsULyGIURgSkrq2vzyDOpZfPaUCjU5vOFAKiloDiLy6Wp11HJA-W7RBrsqyVFmPJgVc35Vj3KaWe5wwHF7-ftCX1L5DUzGQkEDXfqpVut7IEVmh5FWju~fT7HrbRmmMJsZOxNAk8azZwXf52-cQpMkxB55paHtk14u7cLpCDRZJf4IE9OJrTsy2dUZdoWOO4gYH4si-BkMcGorqqV4H~cU27YiZHg7LUn0z99ImM4J6K6i9TuOMQyBdVEE6g8yvFM5A__",
    rating: 4,
    price: 180,
    original_price: 0,
    discount: 0,
  },
  {
    id: 4,
    name: "Black Striped T-shirt",
    image:
      "https://s3-alpha-sig.figma.com/img/6115/920b/12942762aefb7c7ac954e78b76284504?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RLkLjQmnpotJ-vcMJSKi-~18dk1X02-srHqqnWYUwgK6iBS4cDj8ng~aeNcaK9IQ6f8x5~7CKT9nM2ZXz-ZnalXnudyiS1XWunaXXs~bcVolo-aWIOSJIn1MfL-Se4B-DvCKk6unATda4fzUsNcwJo5ttIINSJx82YkB~6C-Us0-wYyCPFeuhTtWF6XMuo6Vkzk8QBKImurFDFPnXTmyTJLNzJDXQVOaHjaHwbZvQMQcniMmM95u9UjESctgi1kTAG2gg5viaNw-pGKNCcQz8Zbsod8MgsDK8PpRlnTVP7rEVkEa79ZtPEqFHJmAJN42oNsOgJmDd9TYpzpRuDli5A__",
    rating: 5,
    price: 120,
    original_price: 150,
    discount: 30,
  },
];

const YouMightAlsoLike = () => {
  return (
    <div className="mt-12 mb-12 px-2 sm:px-4 lg:px-8">
      <h2 className="text-center font-integral font-extrabold text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">
        YOU MIGHT ALSO LIKE
      </h2>

      <div className="flex justify-around items-center overflow-x-auto space-x-2 sm:space-x-4">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="min-w-[220px] sm:min-w-[250px] p-2 sm:p-4">
            <div className="bg-white rounded-lg p-4 hover:shadow-xl transition-shadow duration-300">
              <div className="w-full h-[160px] sm:h-[180px] mb-4 relative">
                <Image
                  src={product.image}
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
