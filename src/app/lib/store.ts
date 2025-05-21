import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Question,
  GuestWizardStep,
  CUSTOM_QUESTIONS_LIMIT,
} from "../constants/info";

export type RespondentType =
  | "Startup"
  | "SME"
  | "Leadership"
  | "Influencer"
  | "";

interface FormState {
  respondentType: RespondentType;
  selectedCategories: string[];
  selectedQuestions: Question[];
  deselectedQuestions: Question[];
  customQuestions: string[];
  anonymousQuestions: Question[];
  mobile: string;
  bookingTime: string;
  completedSteps: GuestWizardStep[];
  calendlyEventUri?: string;
  calendlyInviteeUri?: string;
  meetingUrl: string;

  // Actions
  setField: <
    K extends keyof Omit<FormState, "setField" | "setStep" | "resetForm">
  >(
    field: K,
    value: FormState[K]
  ) => void;
  setStep: (step: GuestWizardStep) => void;
  resetForm: () => void;
  toggleQuestion: (question: Question) => void;
  toggleAnonymous: (question: Question) => void;
  updateCustomQuestion: (index: number, value: string) => void;
  resetQuestions: (newRespondentType?: RespondentType) => void;
}

const initialState: Omit<
  FormState,
  | "setField"
  | "setStep"
  | "resetForm"
  | "toggleQuestion"
  | "toggleAnonymous"
  | "updateCustomQuestion"
  | "resetQuestions"
> = {
  respondentType: "",
  selectedCategories: [],
  selectedQuestions: [],
  deselectedQuestions: [],
  customQuestions: Array(3).fill(""),
  anonymousQuestions: [],
  mobile: "",
  bookingTime: "",
  completedSteps: [],
  meetingUrl: ""
};

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setField: (field, value) => set({ [field]: value }),

      setStep: (step) => {
        const currentSteps = get().completedSteps;
        if (!currentSteps.includes(step)) {
          set({ completedSteps: [...currentSteps, step] });
        }
      },

      resetForm: () => set(initialState),

      toggleQuestion: (question) => {
        const state = get();

        const isSelected = state.selectedQuestions.some(
          (q) =>
            q.question === question.question && q.category === question.category
        );

        // Remove from all arrays first to ensure no duplicates
        const newSelected = state.selectedQuestions.filter(
          (q) =>
            !(
              q.question === question.question &&
              q.category === question.category
            )
        );
        const newDeselected = state.deselectedQuestions.filter(
          (q) =>
            !(
              q.question === question.question &&
              q.category === question.category
            )
        );
        const newAnonymous = state.anonymousQuestions.filter(
          (q) =>
            !(
              q.question === question.question &&
              q.category === question.category
            )
        );

        if (isSelected) {
          set({
            selectedQuestions: newSelected,
            deselectedQuestions: [...newDeselected, question],
            anonymousQuestions: newAnonymous,
          });
        } else {
          set({
            selectedQuestions: [...newSelected, question],
            deselectedQuestions: newDeselected,
            anonymousQuestions: newAnonymous.filter(
              (q) =>
                !(
                  q.question === question.question &&
                  q.category === question.category
                )
            ),
          });
        }
      },

      toggleAnonymous: (question) => {
        const { anonymousQuestions } = get();
        const isAnonymous = anonymousQuestions.some(
          (q) =>
            q.question === question.question && q.category === question.category
        );

        if (isAnonymous) {
          set({
            anonymousQuestions: anonymousQuestions.filter(
              (q) =>
                !(
                  q.question === question.question &&
                  q.category === question.category
                )
            ),
          });
        } else {
          set({
            anonymousQuestions: [...anonymousQuestions, question],
          });
        }
      },

      updateCustomQuestion: (index, value) => {
        const customQuestions = [...get().customQuestions];
        customQuestions[index] = value;
        set({ customQuestions });
      },

      resetQuestions: (newRespondentType) => {
        set({
          respondentType: newRespondentType || "",
          selectedQuestions: [],
          deselectedQuestions: [],
          anonymousQuestions: [],
          customQuestions: Array(CUSTOM_QUESTIONS_LIMIT).fill(""),
          ...(newRespondentType ? { selectedCategories: [] } : {}),
        });
      },
    }),
    {
      name: "guest-form-storage",
      partialize: (state) => state,
    }
  )
);
