"use client";

import { useRouter } from "next/navigation";
import { useFormStore } from "@/app/lib/store";
import { RESPONDENT_TYPES } from "@/app/constants/info";
import { useEffect, useRef } from "react";

export default function Step1() {
  const router = useRouter();
  const { name, respondentType, setField, setStep, resetQuestions } = useFormStore();
  const nameRef = useRef<HTMLInputElement>(null);
  const prevRespondentType = useRef(respondentType);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    if (respondentType && prevRespondentType.current && 
        respondentType !== prevRespondentType.current) {
      resetQuestions(respondentType);
    }
    prevRespondentType.current = respondentType;
  }, [respondentType, resetQuestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && respondentType) {
      setStep("step1");
      router.push("/respondent?step=step2");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Tell us about yourself</h2>
        <p className="mt-1 text-gray-600">We'll use this information to personalize your experience.</p>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name *
        </label>
        <input
          id="name"
          type="text"
          ref={nameRef}
          value={name}
          onChange={(e) => setField("name", e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-black"
          required
        />
      </div>

      <div>
        <legend className="block text-sm font-medium text-gray-700">
          I am a... *
        </legend>
        <div className="mt-2 space-y-2">
          {RESPONDENT_TYPES.map((type) => (
            <div key={type.value} className="flex items-center">
              <input
                id={`respondent-${type.value}`}
                name="respondent-type"
                type="radio"
                checked={respondentType === type.value}
                onChange={() => setField("respondentType", type.value as any)}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor={`respondent-${type.value}`}
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                {type.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!name.trim() || !respondentType}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </form>
  );
}