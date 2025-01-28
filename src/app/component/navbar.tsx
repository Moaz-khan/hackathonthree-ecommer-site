"use client";
import React, { useState, useEffect } from "react";
import { IoSearch, IoReorderThreeOutline } from "react-icons/io5";
import { PiShoppingCartSimple } from "react-icons/pi";
import { FaAngleDown } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi"; // Removed FiUser as we will use initials
import Link from "next/link";
import { ModeToggle } from "./themprovider";
import { GlobalSearchBar } from "./globelsearch";
import { RiCloseLargeLine } from "react-icons/ri";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isBrandsDropdownOpen, setIsBrandsDropdownOpen] = useState(false); // State for brand dropdown
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const brands = ["Versace", "Gucci", "Zara", "Prada", "CalvinKlein"];

  useEffect(() => {
    // Check user authentication and fetch user name
    const userStatus = localStorage.getItem("isAuthenticated");
    const storedName = localStorage.getItem("userName"); // Get user name from localStorage
    if (userStatus === "true" && storedName) {
      setIsAuthenticated(true);
      setUserName(storedName);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleShopDropdown = () => {
    setIsShopDropdownOpen(!isShopDropdownOpen);
  };

  const toggleBrandsDropdown = () => {
    setIsBrandsDropdownOpen(!isBrandsDropdownOpen); // Toggle brand dropdown
  };

  const handleLogin = () => {
    window.location.href = "/auth";
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");
    alert("You have been logged out.");
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase(); // Get the first character in uppercase
  };

  return (
    <div className="relative flex items-center justify-between w-full max-w-screen-xl mx-auto p-4 bg-white shadow-md">
      {/* Hamburger Icon and Logo */}
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <IoReorderThreeOutline
            className="w-6 h-6 text-gray-800 cursor-pointer hover:text-gray-600"
            onClick={toggleMenu}
          />
        </div>
        <div className="text-gray-900 font-integral-cf font-extrabold text-[24px] md:text-[32px] leading-[28px] md:leading-[38px] cursor-pointer">
          Trendify
        </div>
      </div>

      {/* Links - Desktop View */}
      <div className="hidden md:flex items-center gap-8">
        <div
          className="flex items-center text-gray-900 font-satoshi text-[16px] leading-[22px] gap-1 cursor-pointer relative hover:text-gray-600"
          onClick={toggleShopDropdown}>
          <Link href={"/Shop"}> Shop</Link> <FaAngleDown />
          {isShopDropdownOpen && (
            <div className="absolute top-[36px] left-0 bg-white w-32 p-4 shadow-lg rounded-lg border border-gray-200 z-50">
              <div className="text-gray-900 font-satoshi text-[14px] leading-[22px] mb-2 hover:text-gray-600">
                Men
              </div>
              <div className="text-gray-900 font-satoshi text-[14px] leading-[22px] mb-2 hover:text-gray-600">
                Women
              </div>
              <div className="text-gray-900 font-satoshi text-[14px] leading-[22px] hover:text-gray-600">
                Accessories
              </div>
            </div>
          )}
        </div>
        <div className="text-gray-900 font-satoshi text-[16px] leading-[22px] cursor-pointer hover:text-gray-600">
          On Sale
        </div>
        <div className="text-gray-900 font-satoshi text-[16px] leading-[22px] cursor-pointer hover:text-gray-600">
          <Link href={"/"}>New Arrivals</Link>
        </div>
        <div
          className="flex items-center text-gray-900 font-satoshi text-[16px] leading-[22px] gap-1 cursor-pointer relative hover:text-gray-600"
          onClick={toggleBrandsDropdown}>
          Brands <FaAngleDown />
          {isBrandsDropdownOpen && (
            <div className="absolute top-[36px] left-0 bg-white w-32 p-4 shadow-lg rounded-lg border border-gray-200 z-50">
              {brands.map((brand) => (
                <Link key={brand} href={`/brands/${brand.toLowerCase()}`}>
                  <div className="text-gray-900 font-satoshi text-[14px] leading-[22px] mb-2 hover:text-gray-600">
                    {brand}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Search bar and Icons */}
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <IoSearch
            className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600"
            onClick={toggleSearch}
          />
        </div>

        {isSearchOpen && (
          <div className="absolute left-0 right-0 bg-white p-4 shadow-lg md:hidden rounded-lg border border-gray-200 z-50">
            <GlobalSearchBar />
          </div>
        )}

        <div className="hidden md:flex border border-black">
          <GlobalSearchBar />
        </div>

        <Link href={"/cart"}>
          <PiShoppingCartSimple className="w-6 h-6 text-gray-800 hover:text-gray-600 cursor-pointer" />
        </Link>

        {/* Authentication Icons */}
        {isAuthenticated ? (
          <>
            {/* Display user initials as an avatar */}
            <div className="flex items-center justify-center w-8 h-8 bg-gray-800 text-white font-bold rounded-full">
              {userName ? getInitials(userName) : "U"}
            </div>
            {/* Logout Icon */}
            <button
              onClick={handleLogout}
              className="w-6 h-6 text-gray-800 hover:text-gray-600 cursor-pointer">
              <FiLogOut />
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="w-6 h-6 text-gray-800 hover:text-gray-600 cursor-pointer">
            <FiLogIn />
          </button>
        )}
        <ModeToggle />
      </div>
      {/* Sidebar - Mobile View */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Menu</h2>
            <button
              className="text-gray-800 hover:text-gray-600"
              onClick={toggleMenu}>
              <RiCloseLargeLine />
            </button>
          </div>
          <nav className="flex flex-col gap-4">
            <div
              className="flex items-center text-gray-900 font-satoshi text-[16px] leading-[22px] gap-1 cursor-pointer relative hover:text-gray-600"
              onClick={toggleShopDropdown}>
              <Link href={"/Shop"}> Shop</Link> <FaAngleDown />
              {isShopDropdownOpen && (
                <div className="absolute top-[36px] left-0 bg-white w-32 p-4 shadow-lg rounded-lg border border-gray-200 z-50">
                  <div className="text-gray-900 font-satoshi text-[14px] leading-[22px] mb-2 hover:text-gray-600">
                    Men
                  </div>
                  <div className="text-gray-900 font-satoshi text-[14px] leading-[22px] mb-2 hover:text-gray-600">
                    Women
                  </div>
                  <div className="text-gray-900 font-satoshi text-[14px] leading-[22px] hover:text-gray-600">
                    Accessories
                  </div>
                </div>
              )}
            </div>
            <Link href="/sale" className="text-gray-800 hover:text-gray-600">
              On Sale
            </Link>
            <Link
              href="/new-arrivals"
              className="text-gray-800 hover:text-gray-600">
              New Arrivals
            </Link>
            <div
              className="flex items-center text-gray-900 font-satoshi text-[16px] leading-[22px] gap-1 cursor-pointer relative hover:text-gray-600"
              onClick={toggleBrandsDropdown}>
              Brands <FaAngleDown />
              {isBrandsDropdownOpen && (
                <div className="absolute top-[36px] left-0 bg-white w-32 p-4 shadow-lg rounded-lg border border-gray-200 z-50">
                  {brands.map((brand) => (
                    <Link key={brand} href={`/brands/${brand.toLowerCase()}`}>
                      <div className="text-gray-900 font-satoshi text-[14px] leading-[22px] mb-2 hover:text-gray-600">
                        {brand}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
