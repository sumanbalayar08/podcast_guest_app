"use client";

import { useRouter } from "next/navigation";
import { useFormStore } from "@/app/lib/store";
import { useEffect } from "react";

export default function Step4() {
  const router = useRouter();
  const { deselectedQuestions, anonymousQuestions, toggleAnonymous, setStep } =
    useFormStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("step4");
    router.push("/respondent?step=step5");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Anonymous Responses
        </h2>
        <p className="mt-1 text-gray-600">
          You can choose to answer deselected questions anonymously.
        </p>
      </div>

      {/* {selectedQuestions.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Questions You'll Answer Publicly ({selectedQuestions.length})
            </h3>
            <ul className="space-y-2">
              {selectedQuestions.map((q, i) => (
                <li key={`selected-${i}`} className="bg-blue-50 p-3 rounded-md">
                  <span className="font-medium">{q.category}:</span> {q.question}
                </li>
              ))}
            </ul>
          </div>
        )} */}

      {deselectedQuestions.length > 0 ? (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Below are the questions you&apos;ve opted not to answer. (
            {anonymousQuestions.length}/{deselectedQuestions.length})
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            Would you be willing to answer these questions completely
            anonymously?
          </p>
          <ul className="space-y-3">
            {deselectedQuestions.map((q, i) => {
              const isAnonymous = anonymousQuestions.some(
                (aq) => aq.question === q.question && aq.category === q.category
              );

              return (
                <li
                  key={`deselected-${i}`}
                  className={`p-3 rounded-md border ${
                    isAnonymous
                      ? "border-blue-300 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id={`anonymous-${i}`}
                        name={`anonymous-${i}`}
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={() => toggleAnonymous(q)}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label
                        htmlFor={`anonymous-${i}`}
                        className={`block text-sm ${
                          isAnonymous ? "text-blue-800" : "text-gray-700"
                        }`}
                      >
                        <span className="font-medium">{q.category}:</span>{" "}
                        {q.question}
                      </label>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-md text-gray-700 border border-gray-200">
          <p>
            You have chosen to answer all questions. There are no optional
            questions left to answer anonymously.
          </p>
        </div>
      )}

      <div className="pt-4 border-t border-gray-200 flex justify-between">
        <button
          type="button"
          onClick={() => router.push("/respondent?step=step3")}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Back
        </button>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
