import Image from "next/image";
import React, { useEffect, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import EditIcon from "@/assets/Iconly-Bulk-Edit.svg";
import { twMerge } from "tailwind-merge";

export interface IGeneral {
  title: string;
  content: { answer: string; key: string; answer_id: number };
  question_key: string;
  canEdit: boolean;
  className?: string;
}

export const GeneralInfo = ({
  title,
  content,
  question_key,
  canEdit,
  className = "",
}: IGeneral) => {
  const [disabled, setDisabled] = React.useState(true);
  const [answer, setAnswer] = React.useState<string>(
    () => content?.answer || ""
  );
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  // const { dispatch } = useAuth();

  useEffect(() => {
    if (!disabled || loading) {
      setError("");
      return;
    }
  }, [answer, loading, disabled]);

  const handleEdit = () => {
    setDisabled(!disabled);
    setError("");
  };

  useEffect(() => {
    if (!disabled && textAreaRef.current) {
      const textArea = textAreaRef.current;
      textArea.focus();
      const length = textArea.value.length;
      textArea.setSelectionRange(length, length);
    }
  }, [disabled]);

  const handleUpdate = async () => {
    // try {
    //   setLoading(true);
    //   await APIHelper.updateAnswer({
    //     answerId: content.answer_id,
    //     answer,
    //     questionKey: content.key,
    //   });
    //   dispatch({
    //     type: "UPDATE_QUESTION_ANSWER",
    //     payload: { key: question_key, answer },
    //   });
    //   setDisabled(!disabled);
    // } catch (error: unknown) {
    //   const typedError = error as Error;
    //   Sentry.captureException(error);
    //   toast.error(typedError.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div
      className={twMerge(
        className,
        "min-h-[10rem] w-full relative border border-red-500 h-content flex flex-col flex-grow-1 h-content"
      )}
    >
      {!loading ? (
        <div
          className="absolute right-4 md:w-[1.5rem] hover:scale-110 cursor-pointer"
          onClick={disabled ? handleEdit : handleUpdate}
        >
          {canEdit ? (
            disabled ? (
              <Image src={EditIcon} alt="edit icon" />
            ) : (
              "update"
            )
          ) : null}
        </div>
      ) : (
        <div className="absolute right-4 md:w-[1.5rem] hover:scale-110 cursor-pointer">
          <ClipLoader color="#EF3E37" size={15} aria-label="Loading..." />
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="font-bryantProBold text-purple text-[1.25rem]">
          {title}
        </div>
      </div>
      <div className="flex-1">
        <textarea
          className="min-h-[100%] w-full resize-y focus:outline-none bg-white"
          disabled={disabled}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          ref={textAreaRef}
        />
      </div>
      {error && (
        <p className="text-blue-400" style={{ color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
};
