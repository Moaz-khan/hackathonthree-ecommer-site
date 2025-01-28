"use client";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Stayupdates from "./stayupdates";
import Image from "next/image";

export default function Footer() {
  return (
    <div>
      {/* Black Section */}
      <div className="relative w-[90%] lg:w-[80%] h-auto bg-black text-white flex justify-center items-center p-4 sm:p-6 mb-0 z-10 mx-auto rounded-[20px]">
        <Stayupdates />
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-100 text-gray-600 body-font mt-[-50px] py-6 relative">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-[248px] h-[177px] gap-[35px] flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <span className="text-black font-extrabold ml-3 text-[34px]">
              SHOP.CO
            </span>
            <p className="ml-3 text-sm text-gray-500">
              {`We have clothes that suit your style and which you’re proud to
              wear. From women to men.`}
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 md:mt-2 justify-center sm:justify-start gap-2 md:ml-3">
              <Link href={""} className="text-black text-2xl">
                <FaXTwitter />
              </Link>
              <Link href={""} className="text-black text-2xl">
                <FaFacebook />
              </Link>
              <Link href={""} className="text-black text-2xl">
                <FaInstagram />
              </Link>
              <Link href={""} className="text-black text-2xl">
                <FaGithub />
              </Link>
            </span>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                COMPANY
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">About</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Features</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Works</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Career</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                HELP
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Customer Support
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Delivery Details
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Privacy Policy
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                FAQ
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Account</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Manage Deliveries
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Orders</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">Payments</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                RESOURCES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Free eBooks
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Development Tutorial
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    How to - Blog
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Youtube Playlist
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>

        <div className="w-full border-[1px] bg-gray-300"></div>

        {/* Footer Bottom */}
        <div className="bg-gray-100">
          <div className="container mx-auto py-4 px-5 flex flex-col sm:flex-row justify-between items-center">
            {/* Text Section */}
            <p className="text-gray-500 text-sm text-center sm:text-left mb-4 sm:mb-0">
              {`Shop.co © 2000-2023, All Rights Reserved`}
            </p>

            {/* Payment Methods Section */}
            <div className="flex justify-center sm:justify-end items-center gap-2">
              <Image
                src={"/images/visa.png"}
                alt="Visa"
                width={60}
                height={30}
              />
              <Image
                src={"/images/westren.png"}
                alt="Western"
                width={60}
                height={30}
              />
              <Image
                src={"/images/paypal.png"}
                alt="PayPal"
                width={60}
                height={30}
              />
              <Image
                src={"/images/apay.png"}
                alt="Apple Pay"
                width={60}
                height={30}
              />
              <Image
                src={"/images/gpay.png"}
                alt="Google Pay"
                width={60}
                height={30}
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
