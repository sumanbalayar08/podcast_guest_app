"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormStore } from "@/app/lib/store";

export default function Confirmation() {
  const router = useRouter();
  const { bookingTime, calendlyEventUri, resetForm } = useFormStore();

  useEffect(() => {
    if (!bookingTime || !calendlyEventUri) {
      router.replace("/respondent");
    }
    document.title = "Thank You";

    const timer = setTimeout(() => {
      resetForm?.();
    }, 5000);

    const handleUnload = () => {
      resetForm?.();
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeunload", handleUnload);
      resetForm?.();
    };
  }, [bookingTime, calendlyEventUri, router]);

  if (!bookingTime || !calendlyEventUri) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl text-center bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          🎉 Thank You!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Your interview has been scheduled successfully.
          <br />
          We look forward to speaking with you!
        </p>
        <button
          onClick={() => {
            resetForm();
            router.push("/");
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
