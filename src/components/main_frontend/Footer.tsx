"use client";

import {
  Headphones,
  Rss,
  MessageSquare,
  Share,
  Link as LinkIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { podcastInfo } from "@/app/data/episodes";
import Link from "next/link";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-cyan-950/80 border-t border-white/10 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Headphones className="w-8 h-8 text-indigo-600 mr-2" />
              <span className="font-display text-xl font-bold text-white">
                Mindful<span className="text-indigo-600">Bytes</span>
              </span>
            </div>
            <p className="text-gray-400">{podcastInfo.tagline}</p>
            <div className="flex gap-4">
              {Object.entries(podcastInfo.socialLinks).map(
                ([platform, url]) => (
                  <Link
                    key={platform}
                    href={url}
                    aria-label={platform}
                    className="text-gray-400 hover:text-indigo-600"
                  >
                    {platform === "spotify" && <Rss className="w-5 h-5" />}
                    {platform === "apple" && <Headphones className="w-5 h-5" />}
                    {platform === "google" && (
                      <MessageSquare className="w-5 h-5" />
                    )}
                    {platform === "youtube" && <Share className="w-5 h-5" />}
                  </Link>
                )
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-medium text-lg">Quick Links</h4>

            <nav className="flex flex-col space-y-2 ">
              <Link
                href="/episodes"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                Episodes
              </Link>
              <Link
                href="/about"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-medium text-lg">Listen On</h4>
            <div className="flex flex-col space-y-3">
              {Object.entries(podcastInfo.socialLinks).map(
                ([platform, url]) => (
                  <Link
                    key={platform}
                    href={url}
                    className="flex items-center text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-center items-center">
          <p className="text-gray-400 text-sm">
            {currentYear
              ? `© ${currentYear} Mindful Bytes. All rights reserved.`
              : null}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
