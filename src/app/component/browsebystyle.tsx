"use client"
import Link from "next/link";

const casualStyle = {
  title: "Casual",
  imageUrl: "/images/casual.png",
  frameClass:
    "relative bg-white rounded-[15px] w-full sm:w-[280px] h-[260px] overflow-hidden transform transition-all duration-300 ease-in-out", // Added transition for hover
};

const formalStyle = {
  title: "Formal",
  imageUrl: "/images/formal.png",
  frameClass:
    "relative rounded-[15px] w-full sm:w-[600px] h-[260px] overflow-hidden transform transition-all duration-300 ease-in-out", // Added transition for hover
};

const partyStyle = {
  title: "Party",
  imageUrl: "/images/party.png",
  frameClass:
    "relative rounded-[15px] w-full sm:w-[600px] h-[260px] overflow-hidden transform transition-all duration-300 ease-in-out", // Added transition for hover
};

const gymStyle = {
  title: "Gym",
  imageUrl: "/images/gym.png",
  frameClass:
    "relative bg-white rounded-[15px] w-full sm:w-[280px] h-[260px] overflow-hidden transform transition-all duration-300 ease-in-out", // Added transition for hover
};

export default function BrowseByStyle() {
  return (
    <div className="relative bg-gray-100 rounded-[30px] w-full max-w-[1040px] mx-auto mt-[60px] py-8 px-4 sm:px-6">
      <h2 className="text-center font-integral font-extrabold text-[28px] sm:text-[36px] leading-[36px] sm:leading-[48px] text-black mb-12">
        BROWSE BY DRESS STYLE
      </h2>

      <div className="flex flex-wrap justify-center sm:justify-center gap-4 sm:gap-4">
        {/* Casual Style */}
        <div
          className={`${casualStyle.frameClass} bg-cover bg-center hover:scale-105 hover:shadow-lg hover:opacity-80`} // Added hover effects
          style={{ backgroundImage: `url(${casualStyle.imageUrl})` }}>
          <Link href={"/browsbystyle/casual"}>
            <h3 className="font-satoshi font-bold text-[24px] sm:text-[28px] leading-[30px] sm:leading-[36px] text-black p-3 sm:p-2 rounded-md">
              {casualStyle.title}
            </h3>
          </Link>
        </div>

        {/* Formal Style */}
        <div
          className={`${formalStyle.frameClass} bg-cover bg-center hover:scale-105 hover:shadow-lg hover:opacity-80`} // Added hover effects
          style={{ backgroundImage: `url(${formalStyle.imageUrl})` }}>
            <Link href={"/browsbystyle/formal"}>
          <h3 className="font-satoshi font-bold text-[24px] sm:text-[28px] leading-[30px] sm:leading-[36px] text-black p-3 sm:p-2 rounded-md">
            {formalStyle.title}
          </h3>
          </Link>
        </div>

        {/* Party Style */}
        <div
          className={`${partyStyle.frameClass} bg-cover bg-center hover:scale-105 hover:shadow-lg hover:opacity-80`} // Added hover effects
          style={{ backgroundImage: `url(${partyStyle.imageUrl})` }}>
            <Link href={"/browsbystyle/party"}>
          <h3 className="font-satoshi font-bold text-[24px] sm:text-[28px] leading-[30px] sm:leading-[36px] text-black p-3 sm:p-2 rounded-md">
            {partyStyle.title}
          </h3>
          </Link>
        </div>

        {/* Gym Style */}
        <div
          className={`${gymStyle.frameClass} bg-cover bg-center hover:scale-105 hover:shadow-lg hover:opacity-80`} // Added hover effects
          style={{ backgroundImage: `url(${gymStyle.imageUrl})` }}>
             <Link href={"/browsbystyle/gym"}>
          <h3 className="font-satoshi font-bold text-[24px] sm:text-[28px] leading-[30px] sm:leading-[36px] text-black p-3 sm:p-2 rounded-md">
            {gymStyle.title}
          </h3>
          </Link>
        </div>
      </div>
    </div>
  );
}
