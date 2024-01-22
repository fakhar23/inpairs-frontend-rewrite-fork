"use client";

import { useState } from "react";
import { Button, Modal } from "@/components";
import { ProfileQuestions } from ".";

export const UserOptions = () => {
  const [downloadProfileLoading, setDownloadProfileLoading] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);

  const downloadUserData = () => undefined;

  return (
    <div>
      <Modal
        title="Questions"
        isOpen={showQuestion}
        onClose={() => setShowQuestion(false)}
        titleClassName="!text-[2rem] text-purple"
        className="w-5/6 px-4"
      >
        <ProfileQuestions />
      </Modal>

      <div className="overflow-x-auto w-100 flex flex-col gap-4 items-center relative">
        <Button
          className="w-full"
          content="Questions"
          onClick={() => setShowQuestion(!showQuestion)}
        />
        <Button
          className="w-full"
          content="Download Data"
          loading={downloadProfileLoading}
          onClick={() => downloadUserData()}
        />
      </div>
    </div>
  );
};
