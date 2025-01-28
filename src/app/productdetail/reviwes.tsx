"use client";
import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { SlidersHorizontal } from "lucide-react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";

const Reviews = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const reviews = [
    {
      id: 1,
      rating: 4,
      reviewText:
        "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
      reviewer: "Samantha D.",
      postedDate: "August 14, 2023",
    },
    {
      id: 2,
      rating: 5,
      reviewText:
        "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
      reviewer: "Alex M.",
      postedDate: "August 15, 2023",
    },
    {
      id: 3,
      rating: 3,
      reviewText:
        "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
      reviewer: "Ethan R.",
      postedDate: "August 16, 2023",
    },
    {
      id: 4,
      rating: 2,
      reviewText:
        "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
      reviewer: "Olivia P.",
      postedDate: "August 17, 2023",
    },
    {
      id: 5,
      rating: 4,
      reviewText:
        "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
      reviewer: "Liam K.",
      postedDate: "August 18, 2023",
    },
    {
      id: 6,
      rating: 5,
      reviewText:
        "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
      reviewer: "Ava H.",
      postedDate: "August 19, 2023",
    },
  ];

  // Adjust display based on screen width, ensure it's only client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      checkScreenSize(); // Run on initial load
      window.addEventListener("resize", checkScreenSize); // Add resize event listener
      return () => {
        window.removeEventListener("resize", checkScreenSize); // Cleanup on unmount
      };
    }
  }, []);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center w-full px-4 sm:px-16">
        <div className="font-semibold text-sm sm:text-lg text-[rgba(0,0,0,0.6)]">
          Product Details
        </div>
        <div className="font-semibold text-sm sm:text-lg">Rating & Reviews</div>
        <div className="font-semibold text-sm sm:text-lg text-[rgba(0,0,0,0.6)]">
          FAQs
        </div>
      </div>
      <div className="relative my-4">
        <div className="border-t border-gray-300"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 sm:w-[414px] h-1 bg-black"></div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start w-full pl-4 sm:pl-10">
        <div>
          <h1 className="font-bold text-xl sm:text-2xl">
            All Reviews
            <span className="font-normal text-sm text-gray-400">{`(451)`}</span>
          </h1>
        </div>
        <div className="flex space-x-2 sm:pb-5 sm:pr-10 mt-4 sm:mt-0">
          <div className="bg-gray-100 text-black font-semibold rounded-full flex justify-center items-center w-12 h-12 cursor-pointer rotate-90">
            <SlidersHorizontal />
          </div>
          <div className="bg-gray-100 text-black font-semibold rounded-full flex justify-center items-center w-32 h-12 cursor-pointer">
            Latest <MdKeyboardArrowDown />
          </div>
          <button className="bg-black text-white rounded-full flex justify-center items-center w-32 h-12">
            Write a Review
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-16 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2">
        {reviews
          .slice(0, isMobile ? (showAllReviews ? reviews.length : 3) : 6)
          .map((review) => (
            <div
              key={review.id}
              className="w-full sm:w-[550px] h-auto sm:h-[200px] bg-white shadow-md p-4 rounded-2xl">
              <div className="flex justify-between items-center mb-2">
                <div className="ml-2 flex">
                  {[...Array(5)].map((_, index) =>
                    index < review.rating ? (
                      <FaStar key={index} className="text-yellow-500" />
                    ) : (
                      <FaRegStar key={index} className="text-yellow-500" />
                    ),
                  )}
                </div>
                <HiDotsHorizontal className="text-2xl cursor-pointer text-black/40 mr-2" />
              </div>

              <div className="flex">
                <div className="font-semibold text-base sm:text-lg mb-4">
                  {review.reviewer}
                </div>
                <FaRegCircleCheck className="bg-green-600 text-white text-xl rounded-full mt-1 ml-1" />
              </div>

              <div className="text-sm text-gray-600 mb-2">
                {review.reviewText}
              </div>

              <div className="text-xs text-gray-400 mt-4">{`Posted on: ${review.postedDate}`}</div>
            </div>
          ))}
      </div>

      {isMobile && (
        <div className="flex justify-center items-center mt-4">
          <button
            className="border border-black/10 w-40 sm:w-[230px] h-12 rounded-full font-semibold"
            onClick={() => setShowAllReviews((prev) => !prev)}>
            {showAllReviews ? "Show Less Reviews" : "Read More Reviews"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
