"use client";

import React from "react";
import Footer from "@/components/main_frontend/Footer";
import Navbar from "@/components/main_frontend/NavBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
