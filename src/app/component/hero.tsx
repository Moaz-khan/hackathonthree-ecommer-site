"use client"
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative bg-[rgba(242,240,241,1)] overflow-hidden">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center p-6">
        <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 mt-0">
            {`FIND CLOTHES`}
            <br />
            {`THAT MATCHES `}
            <br />
            {`YOUR STYLE`}
          </h2>
          <p className="text-lg mb-2">
          {`  Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.`}
          </p>
          <button className="bg-black text-white py-2 px-6 rounded-full lg:w-[201px] lg:h-[52px] md:min-w-screen md:h-[52px] mb-4">
            <Link href={"/Shop"}> Shop Now</Link>
          </button>
          <div className="mt-4 text-sm text-black">
            <div className="flex flex-row justify-center md:justify-start space-x-6">
              <div className="flex flex-col items-center md:items-start">
                <div className="text-2xl font-bold">200+</div>
                <div>International Brands</div>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="text-2xl font-bold">2,000+</div>
                <div>High-Quality Products</div>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="text-2xl font-bold">30,000+</div>
                <div>Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 relative mb-6 md:mb-0">
          {/* First Vector Image with rotation animation */}
          <div className="absolute hover:w-28 hover:h-28 top-4 right-0 w-24 h-24 z-20 animate-rotate360">
            <Image
              src="/images/vectortwo.png"
              alt="First Vector Image"
              width={104}
              height={104}
              className="object-contain"
            />
          </div>
          {/* Second Vector Image with rotation animation */}
          <div className="absolute hover:w-28 hover:h-28 top-[50%] left-0 w-24 h-24 z-20 animate-rotate360">
            <Image
              src="/images/vectorone.png"
              alt="Second Vector Image"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
          {/* Main Image */}
          <div className="relative top-[60px] px-8 md:px-40">
            <Image
              src="/images/hero.jpeg"
              alt="Descriptive Image"
              width={550}
              height={410}
              className="rounded-lg scale-150"
            />
          </div>
        </div>
      </div>

      {/* Black Banner with Brands at the bottom */}
      <div className="absolute bottom-0 left-0 w-full bg-black text-white py-4 z-10">
        <div className="flex flex-wrap justify-center md:justify-around space-x-4 md:space-x-6">
          <div className="flex justify-center w-1/3 md:w-auto">
            <Image
              src="/images/versace.png"
              alt="versace"
              width={166}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="flex justify-center w-1/3 md:w-auto">
            <Image
              src="/images/zara.png"
              alt="zara"
              width={91}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="flex justify-center w-1/3 md:w-auto">
            <Image
              src="/images/gucci.png"
              alt="gucci"
              width={156}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="flex justify-center w-1/3 md:w-auto">
            <Image
              src="/images/prada.png"
              alt="prada"
              width={194}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="flex justify-center w-1/3 md:w-auto">
            <Image
              src="/images/ck.png"
              alt="ck"
              width={205}
              height={40}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
