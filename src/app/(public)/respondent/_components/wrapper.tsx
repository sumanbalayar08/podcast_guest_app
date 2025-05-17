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
import Image from "next/image";

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-cyan-900 via-indigo-900 to-gray-950 text-white">
      <PodcastHeader />
      <HeroBanner />

      {/* <Image
        src="/background.png"
        alt="divider"
        width={1200}
        height={80}
        className="mx-auto opacity-40"
      /> */}

      <div className="w-full py-6 px-4">
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
                      ? "text-indigo-200"
                      : isCurrent
                      ? "text-white"
                      : "text-gray-400"
                  }`}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 font-bold border-2 transition-all duration-300 ${
                      isCompleted
                        ? "bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-md shadow-indigo-500/30 border-transparent"
                        : isCurrent
                        ? "bg-gray-900 text-purple-200 border-purple-400"
                        : "bg-gray-800 text-indigo-300 border-indigo-500/30"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {isCompleted ? (
                      <FaCheck size={14} />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </motion.div>
                  <span className="text-sm font-medium">{step.label}</span>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-indigo-900/50 rounded-full">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-400 shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-4xl p-6 sm:p-10 transition-all duration-300">
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
