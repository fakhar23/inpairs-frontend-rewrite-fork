"use client";

import { SettingsLayout, UserProfileLayout } from "@/layouts";
import { useGetAnswer } from "@/hooks/useGetAnswer";
import { QuestionGroup } from "../../../api/types";
import { Button } from "@/components";

const BillingSettings = () => {
  const answers = useGetAnswer();
  const GROUPS: Array<{ key: QuestionGroup; title: string; formId: string }> = [
    { key: "GeneralInformation", formId: "", title: "General Information" },
    { key: "Ethnic", formId: "", title: "Ethnic" },
    { key: "Location", formId: "", title: "Location" },
    { key: "Religion", formId: "", title: "Religion" },
    { key: "AboutThem", formId: "", title: "About Them" },
  ];

  return (
    <UserProfileLayout>
      <SettingsLayout>
        <div className="flex flex-col gap-4">
          {GROUPS.map((group) => {
            return (
              <div
                key={group.key}
                id={group.key}
                className="flex flex-col p-4 rounded-xl border-slate-200 shadow-md transition duration-200 ease-in-out"
              >
                <div className="text-2xl text-wrap py-4 md:pb-6 pb-8 text-secondary-500 font-medium">
                  {group.title}
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(30%,1fr))] md:flex md:flex-col gap-10">
                  {answers.data &&
                    answers.data[group.key].map((question) => {
                      return (
                        <div
                          key={question.question_text}
                          className="flex flex-col gap-2 text-base "
                        >
                          <p>{question.question_text}</p>
                          <p className="bg-slate-200 p-4 rounded-md text-wrap overflow-auto">
                            {question.answer}
                          </p>
                        </div>
                      );
                    })}
                </div>
                <div className="flex items-center justify-center p-4 pt-8">
                  <Button>Edit {group.title} section</Button>
                </div>
              </div>
            );
          })}
        </div>
      </SettingsLayout>
    </UserProfileLayout>
  );
};

export default BillingSettings;
