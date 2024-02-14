"use client";

import { SettingsLayout, UserProfileLayout } from "@/layouts";
import { useGetAnswer } from "@/hooks/useGetAnswer";
import { QuestionGroup } from "../../../api/types";
import { Button } from "@/components";

const BillingSettings = () => {
  const answers = useGetAnswer();
  const GROUPS: QuestionGroup[] = [
    "GeneralInformation",
    "Ethnic",
    "Location",
    "Religion",
    "AboutThem",
  ];

  return (
    <UserProfileLayout>
      <SettingsLayout>
        <div className="flex flex-col gap-4">
          {GROUPS.map((group) => {
            return (
              <div
                key={group}
                id={group}
                className="flex flex-col p-4 rounded-xl border-slate-200 shadow-md transition duration-200 ease-in-out"
              >
                <div className="text-2xl text-wrap py-4 text-secondary-500 font-medium">
                  {group}
                </div>
                <div className="flex flex-col gap-10">
                  {answers.data &&
                    answers.data[group].map((question) => {
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
                <div className="flex items-center p-4">
                  <Button>Edit {group} section</Button>
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
