"use client";

import React, { useMemo, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Input } from "@/components";
import { IoChevronUpCircleOutline } from "react-icons/io5";

export function ProfileQuestions({ answers }: any) {
  const [search, setsearch] = useState("");
  const onSearch = (e: any) => {
    setsearch(e.target.value);
  };
  const groupAnswers = useMemo(() => {
    return answers?.length
      ? answers.reduce((row: any, a: any) => {
          const name = a.Question.group || "Other";
          const obj = {
            question: a.Question.question_text,
            answer: a.answer,
          };
          const hasText =
            search &&
            (a.answer.toLowerCase().includes(search.toLowerCase()) ||
              a.Question.question_text
                .toLowerCase()
                .includes(search.toLowerCase()));
          if (hasText || !search) {
            if (row[name]) {
              row[name].push(obj);
            } else {
              row[name] = [obj];
            }
          }
          return row;
        }, {})
      : {};
  }, [answers, search]);

  return (
    <>
      <Input
        id="search"
        type="search"
        className="w-full my-5"
        onChange={onSearch}
        label="Search"
        value={search}
      />
      <div className="h-[30rem] overflow-y-auto my-5">
        <Accordion.Root className="space-y-4 mb-10" type="single" collapsible>
          {!!Object.keys(groupAnswers)?.length &&
            Object.keys(groupAnswers).map((name: any) => {
              const data = groupAnswers[name];
              return (
                <Accordion.Item
                  key={name}
                  value={name}
                  className="data-[state=open]:bg-gray-200 data-[state=open]:mb-5 rounded-xl"
                >
                  <Accordion.Header className="bg-neutral-100 rounded p-4">
                    <Accordion.Trigger className="data-[state=open]:hidden w-full text-start flex justify-between items-center">
                      <p className="max-w-[90%] lg:max-w-full !text-secondary text-lg text-center">
                        {name}
                      </p>
                      <IoChevronUpCircleOutline className="" />
                    </Accordion.Trigger>
                    <Accordion.Trigger className="data-[state=closed]:hidden w-full text-start flex justify-between items-center">
                      <p className="max-w-[90%] lg:max-w-full !text-secondary text-lg text-center">
                        {name}
                      </p>
                      <IoChevronUpCircleOutline className="rotate-180 transform" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp text-justify overflow-hidden px-5">
                    <Accordion.Root
                      className="w-full grid grid-cols-2"
                      type="multiple"
                    >
                      {data?.length &&
                        data.map((ans: any, index: number) => {
                          return (
                            <Accordion.Item
                              key={index}
                              value={`item` + index}
                              className="data-[state=open]:bg-gray-200 rounded-xl py-2 px-3"
                            >
                              <Accordion.Header>
                                <Accordion.Trigger className="data-[state=open]:font-bold data-[state=open]:hidden w-full text-start flex justify-between items-center">
                                  <p className="max-w-[90%] lg:max-w-full">
                                    {ans?.question}
                                  </p>
                                  <IoChevronUpCircleOutline />
                                </Accordion.Trigger>
                                <Accordion.Trigger className="data-[state=open]:font-bold data-[state=closed]:hidden w-full text-start flex justify-between items-center">
                                  <p className="max-w-[90%] lg:max-w-full">
                                    {ans?.question}
                                  </p>
                                  <IoChevronUpCircleOutline className="rotate-180 transform" />
                                </Accordion.Trigger>
                              </Accordion.Header>
                              <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp text-justify overflow-hidden">
                                {ans?.answer?.trim()}
                              </Accordion.Content>
                            </Accordion.Item>
                          );
                        })}
                    </Accordion.Root>
                  </Accordion.Content>
                </Accordion.Item>
              );
            })}
        </Accordion.Root>
      </div>
    </>
  );
}
