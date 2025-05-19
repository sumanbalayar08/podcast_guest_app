import { getQuestionsData } from "@/app/actions/google-sheets.action";
import FormWizardPage from "./_components/wrapper";
import { Question } from "@/app/constants/info";
import { Suspense } from "react";

export const metadata = {
  title: "WFTS Guest Questionnaire",
  description: "A branded, seamless experience for podcast guests",
  icons: {
    icon: "/wfts.png",
  },
  themeColor: "#0f172a",
};

export default async function page() {
  const data = await getQuestionsData();

  if (!data.status || !data.data) return;

  const [headers, ...rows] = data.data;

  const categoryIdx = headers.indexOf("Category");
  const questionIdx = headers.indexOf("Question");
  const respondentTypes = headers.slice(2);

  const allQs: Question[] = rows.map((row) => {
    const relevantTo: string[] = respondentTypes.filter(
      (type, idx) => row[2 + idx]?.toLowerCase() === "yes"
    );
    return {
      category: row[categoryIdx],
      question: row[questionIdx],
      respondentTypes: relevantTo,
    };
  });

  console.log(allQs);

  return (
    <Suspense
      fallback={
        <div className="flex h-[calc(100dvh-4rem)] items-center justify-center bg-slate-900">
          <div className="w-full max-w-lg space-y-4 px-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-full animate-pulse rounded-lg bg-slate-700/60"
              />
            ))}
          </div>
        </div>
      }
    >
      <FormWizardPage questions={allQs} />
    </Suspense>
  );
}
