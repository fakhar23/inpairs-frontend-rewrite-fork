"use client";

import React, { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Input } from "@/components";

export function ProfileQuestions() {
  const [search, setsearch] = useState("");
  const onSearch = (e: any) => {
    setsearch(e.target.value);
  };

  return (
    <div>
      <Input
        id="search"
        type="search"
        className="w-full my-5"
        onChange={onSearch}
        label="Search"
        value={search}
      />
      <Accordion.Root
        className="w-full space-y-4"
        type="multiple"
        defaultValue={["personality", "others"]}
        // collapsible
      >
        The question should be here
        {/* {Object.keys(newQuestions).map((key) => {
          const title =
            key == "personality" ? "Personality Test" : "Other Questions";
          return (
            <Accordion.Item
              key={key}
              value={key}
              className="data-[state=open]:bg-lightGray data-[state=open]:mb-5 rounded-xl"
            >
              <Accordion.Header className="bg-neutral-100 rounded p-4">
                <Accordion.Trigger className="data-[state=open]:hidden w-full text-start flex justify-between items-center">
                  <p className="max-w-[90%] lg:max-w-full !text-purple text-lg text-center">
                    {title}
                  </p>
                  <IoChevronUpCircleOutline className="" />
                </Accordion.Trigger>
                <Accordion.Trigger className="data-[state=closed]:hidden w-full text-start flex justify-between items-center">
                  <p className="max-w-[90%] lg:max-w-full !text-purple text-lg text-center">
                    {title}
                  </p>
                  <IoChevronUpCircleOutline className="rotate-180 transform" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp text-justify overflow-hidden px-5">
                <Accordion.Root
                  className="w-full grid grid-cols-2"
                  type="single"
                  defaultValue={"item0"}
                  collapsible
                >
                  {!!newQuestions[key]?.length &&
                    newQuestions[key]?.map((row: any, i: any) => (
                      <Accordion.Item
                        key={i}
                        value={`item` + i}
                        className="data-[state=open]:bg-lightGray data-[state=open]:mb-5 rounded-xl py-2 px-3"
                      >
                        <Accordion.Header>
                          <Accordion.Trigger className="data-[state=open]:font-bold data-[state=open]:hidden w-full text-start flex justify-between items-center">
                            <p className="max-w-[90%] lg:max-w-full">
                              {row?.question}
                            </p>
                            <IoChevronUpCircleOutline />
                          </Accordion.Trigger>
                          <Accordion.Trigger className="data-[state=open]:font-bold data-[state=closed]:hidden w-full text-start flex justify-between items-center">
                            <p className="max-w-[90%] lg:max-w-full">
                              {row?.question}
                            </p>
                            <IoChevronUpCircleOutline className="rotate-180 transform" />
                          </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp text-justify overflow-hidden mt-5 px-5">
                          {row?.answer?.trim()}
                        </Accordion.Content>
                      </Accordion.Item>
                    ))}
                </Accordion.Root>
              </Accordion.Content>
            </Accordion.Item>
          );
        })} */}
      </Accordion.Root>
    </div>
  );
}
