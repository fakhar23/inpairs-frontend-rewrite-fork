"use client";

import { SettingsLayout, UserProfileLayout } from "@/layouts";

import EditProfile from "./editProfile";
import { Toast } from "@/components";
import { MdEmail } from "react-icons/md";

const questionsAnswers = [
  {
    question:
      "Ok {{field:a9e22065-f360-4b93-8ae4-1a4086e05626}}, what's your phone number?",
    answer: "+1234567890",
    key: "g7nReodScNJu",
    answer_id: 145326,
  },
  {
    question: "firstName",
    answer: "N/A",
    key: "JK56ri09Proe",
  },
  {
    question: "lastName",
    answer: "N/A",
    key: "VkRio3inIPOS",
  },
  {
    question: "dob",
    answer: "N/A",
    key: "2Kpbvgx904l0",
  },
  {
    question: "phone",
    answer: "N/A",
    key: "ooQtpzRypFRM",
  },
  {
    question: "importance_of_islam",
    answer: "N/A",
    key: "NxUSUsBqUopa",
  },
  {
    question: "career_vs_family",
    answer: "N/A",
    key: "pldCMQxTrgrC",
  },
  {
    question: "fitness_activity",
    answer: "N/A",
    key: "zhX81eJHmc9A",
  },
  {
    question: "financial_independence",
    answer: "N/A",
    key: "Fs4XKZzOhn7J",
  },
  {
    question: "closeness_to_family",
    answer: "N/A",
    key: "Gf1a3QaPQvmS",
  },
  {
    question: "passionate",
    answer: "N/A",
    key: "WDaLbDlxQfvj",
  },
  {
    question: "about_yourself",
    answer: "N/A",
    key: "jyi6Nz1xYjm3",
  },
  {
    question: "interests",
    answer: "N/A",
    key: "ilzKhxEa0kpi",
  },
  {
    question: "IG_Handle",
    answer: "N/A",
    key: "fWOABv0TcPf6",
  },
  {
    question: "job",
    answer: "N/A",
    key: "3O6WVdWAyzDj",
  },
  {
    question: "origin",
    answer: "N/A",
    key: "1N8PsgWkZNiR",
  },
  {
    question: "state",
    answer: "N/A",
    key: "nLH2f4kMpbQ1",
  },
  {
    question: "education",
    answer: "N/A",
    key: "VVXcA4DW88BM",
  },
  {
    question: "languages",
    answer: "N/A",
    key: "iq5KEcaJicfQ",
  },
  {
    question: "sect",
    answer: "N/A",
    key: "HUJ3mvfXsC2K",
  },
  {
    question: "city",
    answer: "N/A",
    key: "XGmnrvGopqd3",
  },
  {
    question: "height",
    answer: "N/A",
    key: "PxmJ4G5wtMHN",
  },
  {
    question: "married_before",
    answer: "N/A",
    key: "pxwYLnIRvq4U",
  },
  {
    question: "willing_to_move",
    answer: "N/A",
    key: "fSAgiNElvKze",
  },
  {
    question: "have_kids",
    answer: "N/A",
    key: "Gq4Oo3w5RVYs",
  },
  {
    question: "five_year_plan",
    answer: "N/A",
    key: "MQymy7pksS7T",
  },
  {
    question: "role_of_islam",
    answer: "N/A",
    key: "lpySqlnJJ5kZ",
  },
  {
    question: "most_spent_on_state",
    answer: "N/A",
    key: "VBCNpvMo7VH7",
  },
];
const ProfileSettings = () => {
  const answers = Object.values(questionsAnswers);

  const answersObject = Object.fromEntries(
    answers.map(({ key, answer }) => [key, answer])
  );

  return (
    <UserProfileLayout>
      <SettingsLayout>
        {/* <EditProfile answers={answersObject} />; */}
        <Toast
          type="warn"
          message={
            <p className="text-2xl">
              This page is still under construction. If you’d like to modify any
              of your profile settings, send an email to
              <a
                href="mailto:zachariah@inpairs.io"
                rel="noreferrer"
                target="_blank"
                className="underline text-blue-500  inline-flex items-end gap-1"
              >
                <span className="ml-1">
                  <MdEmail />
                </span>
                zachariah@inpairs.io
              </a>{" "}
              !
            </p>
          }
        />
      </SettingsLayout>
    </UserProfileLayout>
  );
};

export default ProfileSettings;
