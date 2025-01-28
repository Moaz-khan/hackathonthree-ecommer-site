// components/RectangleBox.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { TiMail } from "react-icons/ti";

const Stayupdates = () => {
  return (
    <div className="flex justify-center items-center p-4 pb-0 mb-0">
      <div className="w-full max-w-[1100px] h-auto lg:h-36 bg-black text-white flex flex-col lg:flex-row items-center justify-between p-4 rounded-[20px]">
        <div className="w-full lg:w-[45%] text-white font-extrabold text-[28px] lg:text-[36px] text-center lg:text-left mb-4 ml-3 lg:mb-0">
          <p>STAY UPTO DATE ABOUT</p>
          <p>OUR LATEST OFFERS</p>
        </div>
        <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-end mr-3 gap-2">
          <form
            action="https://formspree.io/f/mrbgjqbz" // Formspree URL for form submission
            method="POST" // POST method
            className="flex flex-col items-center w-full lg:w-[350px] rounded-full">
            <div className="flex items-center w-full bg-white rounded-full mb-3">
              <TiMail className="ml-4 text-gray-500 text-2xl" />
              <Input
                type="email"
                name="email" // Field name for email
                placeholder="Enter your email address"
                className="flex-grow rounded-full text-black border-none focus:ring-0 focus:outline-none pl-4"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-white text-black rounded-full hover:text-white">
              Subscribe to Newsletter
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Stayupdates;
