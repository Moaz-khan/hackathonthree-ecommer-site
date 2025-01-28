"use client";
import Link from "next/link";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const TopHeader = () => {
  return (
    <div className="relative w-full h-[38px] bg-black flex items-center justify-center px-4">
      {/* Centered Text */}
      <div className="text-center">
        <span className="text-white font-satoshi font-normal text-sm md:text-base leading-[19px]">
          Sign up and get 20% off your first order.{" "}
          <span className="font-bold cursor-pointer hover:underline">
            <Link href={"/auth"}> Sign Up Now</Link>
          </span>
        </span>
      </div>

      {/* Close Icon - Hidden on Mobile */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden md:block">
        <AiOutlineClose className="w-5 h-5 text-white cursor-pointer md:w-6 md:h-6" />
      </div>
    </div>
  );
};

export default TopHeader;
