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
import HeroBanner from "@/components/respondent_frontend/HeroBanner";
import PodcastFooter from "@/components/respondent_frontend/PodcastFooter";
import PodcastHeader from "@/components/respondent_frontend/PodcastHeader";

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
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <PodcastHeader />
      <HeroBanner />

      <div className="w-full py-4 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-4 relative z-10">
            {guestSteps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div
                  key={step.slug}
                  className={`flex flex-col items-center flex-1 text-center transition-all duration-300 ${
                    isCompleted
                      ? "text-orange-500" 
                      : isCurrent
                      ? "text-orange-700" 
                      : "text-orange-300" 
                  }`}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 font-semibold border-2 transition-all duration-300 ${
                      isCompleted
                        ? "bg-orange-500 text-white border-orange-500"
                        : isCurrent
                        ? "bg-white text-orange-700 border-orange-700"
                        : "bg-orange-100 text-orange-400 border-orange-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {isCompleted ? (
                      <FaCheck size={16} />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </motion.div>
                  <span className="text-sm font-medium">{step.label}</span>
                </div>
              );
            })}
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-600"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-4">
        <div className="w-full max-w-4xl transition-all duration-300">
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

      <PodcastFooter />
    </div>
  );
}
