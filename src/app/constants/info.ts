import Step1 from "../(public)/respondent/_components/step1";
import Step2 from "../(public)/respondent/_components/step2";
import Step3 from "../(public)/respondent/_components/step3";
import Step4 from "../(public)/respondent/_components/step4";
import Step5 from "../(public)/respondent/_components/step5";

export type GuestWizardStep = "step1" | "step2" | "step3" | "step4" | "step5";

export type Question = {
  category: string;
  question: string;
  respondentType?: string[];
};

export const guestSteps: Array<{ slug: GuestWizardStep; label: string }> = [
  { slug: "step1", label: "Personal Info" },
  { slug: "step2", label: "Select Questions" },
  { slug: "step3", label: "Suggest Questions" },
  { slug: "step4", label: "Anonymous Opt-in" },
  { slug: "step5", label: "Schedule Interview" },
];

export const RESPONDENT_TYPES = [
  { value: "Startup", label: "Startup Founder" },
  { value: "SME", label: "SME Business Owner" },
  { value: "Leadership", label: "Corporate Leader" },
  { value: "Influencer", label: "Industry Influencer" },
];

export const QUESTION_CATEGORIES = [
  { key: "Intro", label: "Intro", section: null },
  { key: "Hard Truths", label: "Section A: Hard Truths", section: "A" },
  { key: "Advice", label: "Section B: Advice", section: "B" },
  { key: "Habits", label: "Section C: Habits", section: "C" },
  { key: "Inspiration", label: "Section D: Inspiration", section: "D" },
];

export const STEP_COMPONENTS: Record<GuestWizardStep, any> = {
  step1: Step1,
  step2: Step2,
  step3: Step3,
  step4: Step4,
  step5: Step5,
};

export const CUSTOM_QUESTIONS_LIMIT = 3;

export const formatQuestions = (questions: Question[]) => {
  return questions.map((q, index) => `${index + 1}. ${q.question}`).join("\n");
};
