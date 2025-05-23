"use client";

import { useRouter } from "next/navigation";
import { useFormStore } from "@/app/lib/store";
import { QUESTION_CATEGORIES } from "@/app/constants/info";
import { useEffect, useState } from "react";

export default function Step2() {
  const router = useRouter();
  const {
    selectedQuestions,
    deselectedQuestions,
    toggleQuestion,
    setStep,
    respondentType,
  } = useFormStore();

  const [openCategory, setOpenCategory] = useState<string | null>(null);

  useEffect(() => {
    const { selectedQuestions, deselectedQuestions } = useFormStore.getState();

    const allQuestions = [...selectedQuestions, ...deselectedQuestions];
    const uniqueQuestions = allQuestions.filter(
      (q, index, self) =>
        index ===
        self.findIndex(
          (t) => t.question === q.question && t.category === q.category
        )
    );

    const newSelected = uniqueQuestions.filter((q) =>
      selectedQuestions.some(
        (sq) => sq.question === q.question && sq.category === q.category
      )
    );
    const newDeselected = uniqueQuestions.filter(
      (q) =>
        !selectedQuestions.some(
          (sq) => sq.question === q.question && sq.category === q.category
        )
    );

    useFormStore.getState().setField("selectedQuestions", newSelected);
    useFormStore.getState().setField("deselectedQuestions", newDeselected);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("step2");
    router.push("/respondent?step=step3");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold ">{respondentType} Questions</h2>
        <p className="mt-1 ">
          Please review and deselect any questions you don't want to answer.
        </p>
        
      </div>

      <div className="space-y-8">
        {QUESTION_CATEGORIES.map(({ key, label }) => {
          const categoryQuestions = selectedQuestions
            .concat(deselectedQuestions)
            .filter((q) => q.category === key);

          if (categoryQuestions.length === 0) return null;

          const isOpen = openCategory === key;

          return (
            <div key={key} className="border rounded-lg p-4 bg-white text-black">
              <div
                onClick={() => setOpenCategory(isOpen ? null : key)}
                className="cursor-pointer text-lg font-bold mb-2 w-fit p-1 rounded-full"
              >
                {label}
              </div>
              {isOpen && (
                <div className="mt-3 space-y-3 overflow-y-auto">
                  {categoryQuestions.map((q, i) => {
                    const inputId = `question-${key}-${i}`;
                    const isSelected = selectedQuestions.some(
                      (sq) =>
                        sq.question === q.question && sq.category === q.category
                    );

                    return (
                      <div key={i} className="flex items-start">
                        {key !== "Intro" && (
                          <div className="flex items-center h-5">
                            <input
                              id={inputId}
                              name={inputId}
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleQuestion(q)}
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                          </div>
                        )}
                        <div className={`ml-3 ${key !== "Intro" ? "" : "ml-8"}`}>
                          <label htmlFor={inputId} className="block text-md">
                            {q.question}
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => router.push("/respondent?step=step1")}
          className="inline-flex justify-center text-white rounded-md border border-transparent cursor-pointer bg-blue-600 py-2 px-4 text-lg font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          type="submit"
          className="inline-flex justify-center text-white rounded-md border border-transparent cursor-pointer bg-blue-600 py-2 px-4 text-lg font-semibold shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
