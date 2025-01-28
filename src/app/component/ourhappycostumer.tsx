"use client";
import { FaRegCircleCheck } from "react-icons/fa6";
import { LiaStarSolid } from "react-icons/lia";
import { useState, useEffect } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const happyCustomersData = [
  {
    id: 1,
    title: "Sarah M.",
    description:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 5,
  },
  {
    id: 2,
    title: "Alex K.",
    description:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    rating: 5,
  },
  {
    id: 3,
    title: "James L.",
    description:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    rating: 5,
  },
  {
    id: 4,
    title: "Olivia P.",
    description:
      "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
    rating: 4,
  },
];

export default function OurHappyCustomers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    // Client-side code to update the itemsPerSlide based on window width
    const updateItemsPerSlide = () => {
      setItemsPerSlide(window.innerWidth < 640 ? 1 : 3);
    };

    updateItemsPerSlide(); // Initial check

    // Event listener to handle window resize
    window.addEventListener("resize", updateItemsPerSlide);
    return () => {
      window.removeEventListener("resize", updateItemsPerSlide);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : happyCustomersData.length - itemsPerSlide,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < happyCustomersData.length - itemsPerSlide ? prevIndex + 1 : 0,
    );
  };

  return (
    <section className="relative bg-white mt-40 py-8 px-4 sm:px-6 lg:px-12">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-center font-sans font-extrabold text-4xl md:text-5xl sm:text-xl leading-tight text-black">
          OUR HAPPY CUSTOMERS
        </h2>
        <div className="flex space-x-4">
          <GoArrowLeft
            onClick={handlePrev}
            className="text-3xl font-bold cursor-pointer hover:text-gray-500 transition-colors"
          />
          <GoArrowRight
            onClick={handleNext}
            className="text-3xl font-bold cursor-pointer hover:text-gray-500 transition-colors"
          />
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-10 bg-gradient-to-r from-white backdrop-blur-md"></div>
        <div className="absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-white backdrop-blur-md"></div>
        <div
          className="flex transition-transform duration-500 ease-in-out gap-4"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
            width: `${(happyCustomersData.length / itemsPerSlide) * 100}%`,
          }}>
          {happyCustomersData.map((customer) => (
            <div
              key={customer.id}
              className="bg-white rounded-2xl min-w-full sm:min-w-3/4 md:min-w-1/2 lg:min-w-[350px] p-6 flex flex-col justify-between gap-4 border border-gray-300 shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:-translate-y-2">
              <div className="flex mb-2">
                {Array.from({ length: 5 }, (_, idx) => (
                  <LiaStarSolid
                    key={idx}
                    size={20}
                    className={
                      idx < customer.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <h3 className="flex justify-start items-center font-sans font-bold text-xl text-black">
                {customer.title}
                <FaRegCircleCheck className="ml-2 bg-green-600 text-white rounded-full p-1" />
              </h3>
              <p className="text-gray-600">{customer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
