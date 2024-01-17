import React, { useState } from "react";
import Link from "next/link";

import { Button, Loading, Modal } from "@/components";
import { Input, Select, RegularImages as Images } from "@/components";
import { formStructure } from "./formStructure";
import BlockingPhoneNoModal from "../../components/BlockingPhoneNoModal";
import RegularTextArea from "../../components/RegularTextArea";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

type Props = {
  answers: {
    [key: string]: string;
  };
};

type NewAnswer = {
  newAnswer: string;
  question_key: string;
};

type FormEntry = (typeof formStructure)[number] & {
  answer: string | null;
};

function RenderQuestion({
  question,
  errors,
  onChange,
}: {
  question: FormEntry;
  errors: Record<string, string>;
  onChange: (newVal: NewAnswer) => void;
}) {
  const readOnly = "readOnly" in question && question.readOnly;

  const validation = "validations" in question ? question.validations : null;

  switch (question.type) {
    case "short_text":
    case "email":
    case "phone_number":
    case "date":
    case "number": {
      let type: typeof question.type | "text" | "tel";
      if (["short_text", "long_text"].includes(question.type)) {
        type = "text";
      } else if (question.type === "phone_number") {
        type = "tel";
      } else {
        type = question.type;
      }

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
          newAnswer: e.target.value,
          question_key: question.question_key,
        });

        console.log(e.target.value);
      };

      return (
        <Input
          variation="secondary"
          label={question.title}
          errors={errors[question.question_key]}
          id={question.question_key}
          placeholder={question.title}
          type={type}
          name={question.question_key}
          onChange={handleChange}
          value={question.answer || ""}
          readOnly={readOnly}
          min={validation?.min_value}
          max={validation?.max_value}
          className="w-[50%]"
        />
      );
    }

    case "long_text":
      return (
        <RegularTextArea
          error={errors[question.question_key]}
          id={question.question_key}
          placeholder={question.title}
          name={question.question_key}
          onChange={onChange}
          value={question.answer || ""}
          readOnly={readOnly}
        />
      );

    case "yes_no": {
      return (
        <Select
          id={question.question_key}
          value={question.answer || ""}
          label={question.title}
          options={[
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ]}
          error={errors[question.question_key]}
          onChange={onChange}
          readOnly={readOnly}
        />
      );
    }

    case "dropdown":
    case "multiple_choice":
    case "opinion_scale":
    case "picture_choice":
    case "ranking": {
      const isMulti = ["multiple_choice", "picture_choice", "ranking"].includes(
        question.type
      );

      return (
        <Select
          id={question.question_key}
          value={question.answer || ""}
          label={question.title}
          isMulti={isMulti}
          options={question.choices.map((v) => ({
            label: String(v),
            value: v,
          }))}
          error={errors[question.question_key]}
          onChange={onChange}
        />
      );
    }
  }
}

const EditProfile = (props: Props) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isBlockingModal, setIsBlockingModal] = React.useState<boolean>(false);
  const [images, setImages] = useState<any[]>([]);

  function currentFormEvaluation(answers: Record<string, string>) {
    return Object.fromEntries(
      formStructure
        .filter((field) =>
          field.shouldBeAnswered(
            Object.fromEntries(
              Object.entries(answers).map(([k, v]) => [
                k,
                { question_key: k, answer: v },
              ])
            )
          )
        )
        .map((field) => [
          field.question_key,
          { ...field, answer: answers[field.question_key] },
        ])
    );
  }

  const initialForm = currentFormEvaluation(props.answers);
  const [form, setForm] = useState(initialForm);

  const [errors, setErrors] = useState<Record<string, string>>(
    Object.fromEntries(
      Object.values(initialForm).map((k) => [
        k.question_key,
        !k.answer ? "This field is required" : "",
      ])
    )
  );

  const SAVE = () => undefined;

  function handleChange(newVal: NewAnswer) {
    setForm((currentVal) => {
      const currentForm = currentFormEvaluation(
        Object.fromEntries(
          Object.values({
            ...currentVal,
            [newVal.question_key]: {
              ...currentVal[newVal.question_key],
              answer: newVal.newAnswer,
            },
          }).map((v) => [v.question_key, v.answer])
        )
      );

      const entryError = () => {
        const currentFormEntry = currentForm[newVal.question_key];
        const validation = Object.entries(currentFormEntry)
          .find(([k, v]) => {
            return k === "validations";
          })
          ?.at(1);
        const validationError =
          new Number(newVal.newAnswer) < validation?.min_value ||
          new Number(newVal.newAnswer) > validation?.max_value;

        if (!newVal.newAnswer || newVal.newAnswer === "[]")
          return "This field is required";
        else if (validation && validationError)
          return "Age must be between 18 and 99";
        return "";
      };

      setErrors(
        Object.fromEntries(
          Object.values(currentForm).map((k) => [
            k.question_key,
            k.question_key === newVal.question_key
              ? entryError()
              : !k.answer
                ? "This field is required"
                : "",
          ])
        )
      );

      return currentForm;
    });
  }

  const processing = loading;

  return (
    <div
      className={`container px-[20%] transition-all-children-0_3 ${poppins.className}`}
    >
      {processing && (
        <div className="absolute -top-16 bottom-0 right-0 left-0 bg-black/10 pt-5 flex items-start  justify-center">
          <Loading />
        </div>
      )}

      <div className="flex justify-between mt-4 relative">
        <Modal
          isOpen={isBlockingModal}
          onClose={() => setIsBlockingModal(false)}
        >
          <BlockingPhoneNoModal setIsBlockingModal={setIsBlockingModal} />
        </Modal>

        <h1 className="text-2xl font-bold text-slate-800">Edit Profile</h1>

        <button
          className="bg-red-500 text-white px-[2rem] py-[0.3rem] md:px-[5rem] md:py-[0.4rem] md:text-regular rounded-3xl text-[1.2rem] shadow-xl hover:bg-[#f87171] disabled:cursor-not-allowed disabled:bg-slate-300 "
          onClick={() => setIsBlockingModal(true)}
        >
          Blocked Users
        </button>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mt-8">
          <div className="flex items-start gap-4 mb-5">
            <Images
              setLoading={setLoading}
              name={"images"}
              error={errors.images}
              setImages={setImages}
              images={images}
            />
          </div>

          {Object.values(form)
            .reduce<[FormEntry, FormEntry | undefined][]>(
              (curr, next, index, array) => {
                if (index % 2 === 0) curr.push([next, array[index + 1]]);
                return curr;
              },
              []
            )
            .map((question) => {
              return (
                <div
                  className="flex items-start gap-4 mt-5 "
                  key={question[0].question_key}
                >
                  {question[0] && (
                    <RenderQuestion
                      question={question[0]}
                      errors={errors}
                      onChange={handleChange}
                      key={question[0].question_key}
                    />
                  )}

                  {question[1] && (
                    <RenderQuestion
                      question={question[1]}
                      errors={errors}
                      onChange={handleChange}
                      key={question[1].question_key}
                    />
                  )}
                </div>
              );
            })}
        </div>

        <div className="flex justify-center gap-4 my-8">
          <Button
            type="button"
            path="#"
            content="Save changes"
            loading={loading}
            onClick={SAVE}
          />

          <Link
            href="/profile/me"
            type="button"
            className="bg-while text-black px-[4rem] py-[0.3rem] md:px-[10rem] md:py-[1rem] md:text-regular rounded-3xl text-[1.2rem] shadow-xl border border-black disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
