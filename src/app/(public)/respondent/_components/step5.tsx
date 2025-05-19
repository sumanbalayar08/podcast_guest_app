"use client";

import { useRouter } from "next/navigation";
import { useFormStore } from "@/app/lib/store";
import { useEffect, useState } from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { addRow } from "@/app/actions/google-sheets.action";
import toast from "react-hot-toast";
import { formatQuestions } from "@/app/constants/info";

export default function Step5() {
  const router = useRouter();
  const {
    name,
    email,
    mobile,
    respondentType,
    selectedQuestions,
    deselectedQuestions,
    anonymousQuestions,
    customQuestions,
    setField,
    setStep,
    bookingTime,
    meetingUrl,
  } = useFormStore();

  useCalendlyEventListener({
    onEventScheduled: async (e) => {
      const eventUri = e.data.payload.event.uri;
      const inviteeUri = e.data.payload.invitee.uri;

      setField("calendlyEventUri", eventUri);
      setField("calendlyInviteeUri", inviteeUri);

      try {
        const res = await fetch("/api/calendly", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventUri }),
        });

        const result = await res.json();

        if (res.ok) {
          const startTime = result.data.resource.start_time;
          const meetingUrl = result.data.resource.location.join_url;
          setField("meetingUrl", meetingUrl);
          setField("bookingTime", startTime);
        } else {
          console.error("Error fetching event:", result.error);
        }
      } catch (error) {
        console.error("Failed to fetch Calendly event:", error);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingTime) {
      alert("Please select a time for your interview.");
      return;
    }

    const values = [
      name,
      respondentType,
      formatQuestions(selectedQuestions),
      formatQuestions(deselectedQuestions),
      formatQuestions(anonymousQuestions),
      customQuestions.filter(Boolean).join("\n"),
      email,
      mobile,
      meetingUrl,
    ];

    const res = await addRow(values);

    if (res.status) {
      setStep("step5");
      router.replace("/confirmation");
    } else {
      toast.error(res.message || "Error Saving the Data");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold ">Schedule Your Interview</h2>
        <p className="mt-1 ">
          Please provide your contact information and select a time for your
          interview.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-md font-medium ">
            Work Email *
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setField("email", e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="mobile" className="block text-md font-medium ">
            Mobile Number *
          </label>
          <input
            id="mobile"
            type="tel"
            value={mobile}
            onChange={(e) => setField("mobile", e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm "
            required
          />
        </div>

        {respondentType && (
          <div className="pt-4">
            <h3 className="text-lg font-medium  mb-3">Select a Time</h3>
            <div className="calendly-inline-widget">
              <InlineWidget
                url={process.env.NEXT_PUBLIC_CALENDLY_EVENT_URL!}
                styles={{ height: "650px" }}
              />
            </div>
          </div>
        )}

        {bookingTime && (
          <div className="bg-green-50 p-4 rounded-md">
            <p className="text-green-800 font-medium">
              Interview scheduled for: {new Date(bookingTime).toLocaleString()}
            </p>
          </div>
        )}

        {bookingTime && meetingUrl && (
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-blue-800 font-medium">
              Meeting Link:{" "}
              <a
                href={meetingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600"
              >
                {meetingUrl}
              </a>
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200 flex justify-between">
          <button
            type="button"
            onClick={() => router.push("/respondent?step=step4")}
            className="inline-flex justify-center text-white rounded-md border border-transparent cursor-pointer bg-blue-600 py-2 px-4 text-lg font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            Back
          </button>
          <button
            type="submit"
            disabled={!bookingTime}
            className="inline-flex justify-center text-white rounded-md border border-transparent cursor-pointer bg-blue-600 py-2 px-4 text-lg font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            Complete Booking
          </button>
        </div>
      </form>
    </div>
  );
}
