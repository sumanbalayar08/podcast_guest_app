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
    <Suspense fallback={<div>Loading wizard...</div>}>
      <FormWizardPage questions={allQs} />
    </Suspense>
  );
}
