"use client";

import { useRouter } from "next/navigation";
import { useFormStore } from "@/app/lib/store";
import { CUSTOM_QUESTIONS_LIMIT } from "@/app/constants/info";
import { useState } from "react";

export default function Step3() {
  const router = useRouter();
  const { customQuestions, updateCustomQuestion, setStep } = useFormStore();
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("step3");
    router.push("/respondent?step=step4");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold ">Suggest Your Own Questions</h2>
        <p className="mt-1 ">
          You can add up to {CUSTOM_QUESTIONS_LIMIT} questions you'd like us to
          ask.
        </p>
      </div>

      <div className="space-y-4">
        {Array(CUSTOM_QUESTIONS_LIMIT)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="relative">
              <label
                htmlFor={`custom-question-${i}`}
                className="block text-sm font-medium  mb-1"
              >
                Question {i + 1}
              </label>
              <textarea
                id={`custom-question-${i}`}
                rows={3}
                value={customQuestions[i] || ""}
                onChange={(e) => updateCustomQuestion(i, e.target.value)}
                onFocus={() => setFocusedIndex(i)}
                onBlur={() => setFocusedIndex(null)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-white"
                placeholder="e.g., What's the biggest mistake you made in your career and what did you learn from it?"
              />
              {focusedIndex === i && (
                <div className="absolute right-0 bottom-0 mb-1 mr-1 px-1 text-xs ">
                  {customQuestions[i]?.length || 0}/150
                </div>
              )}
            </div>
          ))}
      </div>

      <div className="pt-4 border-t border-gray-200 flex justify-between">
        <button
          type="button"
          onClick={() => router.push("/respondent?step=step2")}
          className="inline-flex justify-center rounded-md border border-transparent cursor-pointer bg-blue-600 py-2 px-4 text-md font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent cursor-pointer bg-blue-600 py-2 px-4 text-md font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
