"use client";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="relative text-white">
      <div className="absolute inset-0 bg-pattern bg-cover bg-center" />
      <div className="absolute inset-0 bg-primary/90 mix-blend-multiply" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <Image src="/wfts.png" alt="WFTS" width={80} height={80} className="mb-4" />
      
      </div>
    </section>
  );
}