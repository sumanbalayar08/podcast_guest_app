"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function PodcastHeader() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed top-0 inset-x-0 z-30 flex items-center justify-between px-4 py-2 bg-gray-200">
      <div className="flex items-center justify-center gap-2">
        <Image src="/wfts.png" alt="logo" width={64} height={64}/>
      </div>
      <span className="text-md font-bold text-orange-500">Guest Questionnaire</span>
    </div>
  );
}
