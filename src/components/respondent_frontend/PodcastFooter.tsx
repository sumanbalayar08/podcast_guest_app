"use client";
import Image from "next/image";
import { FaTwitter, FaInstagram, FaSpotify } from "react-icons/fa";

export default function PodcastFooter() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8 mt-12 border-t border-gray-200">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-2">
          <Image src="/wfts.png" alt="logo" width={48} height={48} />
        </div>
        <span>© Wisdom From the Sense. All rights reserved.</span>
        <div className="flex gap-4 text-primary-600 text-xl cursor-pointer">
          <FaTwitter className="hover:text-primary-700 transition" />
          <FaInstagram className="hover:text-primary-700 transition" />
          <FaSpotify className="hover:text-primary-700 transition" />
        </div>
      </div>
    </footer>
  );
}
