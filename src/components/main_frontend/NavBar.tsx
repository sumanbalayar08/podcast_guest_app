"use client";

import { useState, useEffect } from "react";
import { Podcast, Menu, X } from "lucide-react";
import Link from "next/link";
import { podcastInfo } from "@/app/data/episodes";
import { Button } from "../ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-cyan-950/90 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/wfts.png" alt="Podcast Logo" className="w-12 h-12 mr-2" />{" "}
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-gray-300 hover:text-indigo-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/episodes"
            className="text-gray-300 hover:text-indigo-600 transition-colors"
          >
            Episodes
          </Link>
          <Link
            href="/about"
            className="text-gray-300 hover:text-indigo-600 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-300 hover:text-indigo-600 transition-colors"
          >
            Contact
          </Link>
        </div>

        <div className="hidden md:block">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full">
            Listen Now
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800/95 backdrop-blur-lg p-4">
          <div className="flex flex-col space-y-4 py-4">
            <Link
              href="/"
              className="text-gray-300 hover:text-indigo-600 px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/episodes"
              className="text-gray-300 hover:text-indigo-600 px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Episodes
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-indigo-600 px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-300 hover:text-indigo-600 px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white mt-2">
              Listen Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
