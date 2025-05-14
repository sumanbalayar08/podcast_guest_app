"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import {
  guestSteps,
  GuestWizardStep,
  STEP_COMPONENTS,
} from "@/app/constants/info";
import { useEffect, useRef } from "react";
import { useFormStore } from "@/app/lib/store";
import { motion, AnimatePresence } from "framer-motion";

export default function FormWizardPage({ questions }: { questions: any[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setField, selectedQuestions, respondentType, completedSteps } =
    useFormStore();

  useEffect(() => {
    if (questions.length > 0 && selectedQuestions.length === 0) {
      const filteredQuestions = questions.filter((q) =>
        q.respondentTypes?.includes(respondentType)
      );
      setField("selectedQuestions", filteredQuestions);
    }
  }, [questions, respondentType]);

  const lastStep = completedSteps[completedSteps.length - 1] ?? "step1";
  const currentStep = (searchParams.get("step") || lastStep) as GuestWizardStep;
  const StepComponent = STEP_COMPONENTS[currentStep];
  const currentStepIndex = guestSteps.findIndex((s) => s.slug === currentStep);

  const prevStepIndexRef = useRef(currentStepIndex);
  const prevStepIndex = prevStepIndexRef.current;

  useEffect(() => {
    prevStepIndexRef.current = currentStepIndex;
  }, [currentStepIndex]);

  const progressPercentage = ((currentStepIndex + 1) / guestSteps.length) * 100;

  useEffect(() => {
    if (
      currentStepIndex > 0 &&
      !completedSteps.includes(guestSteps[currentStepIndex - 1].slug)
    ) {
      router.push(`/respondent?step=${guestSteps[currentStepIndex - 1].slug}`);
    }
  }, [currentStepIndex, completedSteps, router]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      {/* Progress Section */}
      <div className="w-full py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            {guestSteps.map((step, index) => (
              <div
                key={step.slug}
                className={`flex flex-col items-center flex-1 text-center ${
                  index < currentStepIndex ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 text-sm font-bold ${
                    index < currentStepIndex
                      ? "bg-blue-600 text-white"
                      : index === currentStepIndex
                      ? "border-2 border-blue-600 bg-white"
                      : "border border-gray-300 bg-white"
                  }`}
                >
                  {index < currentStepIndex ? <FaCheck size={14} /> : index + 1}
                </div>
                <span className="text-sm font-medium text-white">{step.label}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 sm:p-10 transition-all duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{
                opacity: 0,
                x: currentStepIndex > prevStepIndex ? 60 : -60,
              }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: currentStepIndex > prevStepIndex ? -60 : 60,
              }}
              transition={{ duration: 0.4 }}
            >
              {StepComponent && <StepComponent />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
