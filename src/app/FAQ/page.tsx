"use client";

import React from "react";

import Image from "next/image";

import Accordion from "@/components/Accordion";
import { Footer } from "@/components/Footer";
import { PublicNavbar } from "@/components/PublicNav";

import questionSvg from "./Questions-bro.svg";
import { NavbarLayout } from "@/layouts";

const questions = [
  {
    question: "How We Talk to You?",
    answer: `Our communication with you is through both texting and email (so don’t use your spam emails). 
                Once you submit all the necessary profile information, you’ll get an email from us. 
                We promise not to spam you guys, we just want to make sure you know when to check the website or anything important. 
                Texts don’t go both ways, so shoot us a DM for any comments or concerns! We read everything.`,
  },
  {
    question: "Am I guaranteed a match?",
    answer: `While we don’t guarantee anything, the person we pair you with is worth your time to get to know.`,
  },
  {
    question: "Do you have crazy people on there?",
    answer: `Anybody with multiple complaints will be removed from the app, so no need to worry about creeps or crazies. 
                We will have a streamlined process to report problematic individuals or file a complaint to ensure a high-quality experience for you and the other users on our platform.`,
  },
];

const FAQ = () => {
  return (
    <>
      <NavbarLayout footer>
        <div className="w-full flex items-center justify-center pr-20 py-20 md:p-10">
          <section className="w-[50%] h-full [&>*]:w-[60%] [&>*]:mx-auto  md:hidden">
            <Image src={questionSvg} alt="question image" />
          </section>

          <section className="w-[50%] md:w-full min-h-full ">
            <div className="">
              <h2 className="mb-5 font-bryantProBold text-[2rem] font-semibold  text-purple capitalize">
                Frequently asked <span className="text-red">questions</span>
              </h2>
            </div>

            <div className="flex flex-col justify-start gap-4 lg:pt-5">
              {questions.map((e) => (
                <Accordion
                  question={e.question}
                  answer={e.answer}
                  key={e.question}
                />
              ))}
            </div>
          </section>
        </div>
      </NavbarLayout>
    </>
  );
};

export default FAQ;
