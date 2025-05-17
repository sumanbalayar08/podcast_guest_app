"use client";
import Image from "next/image";
import { FaTwitter, FaInstagram, FaSpotify } from "react-icons/fa";

export default function PodcastFooter() {
  return (
    <footer className="bg-primary text-white py-8 mt-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <Image src="/wfts.png" alt="logo" width={48} height={48} />
        <span>© {new Date().getFullYear()} WFTS Podcast</span>
        <div className="flex gap-4 text-accent text-xl">
          <FaTwitter /> <FaInstagram /> <FaSpotify />
        </div>
      </div>
    </footer>
  );
}