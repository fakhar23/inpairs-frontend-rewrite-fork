"use client";

import { useState } from "react";
import { Button, Modal } from "@/components";
import { ProfileQuestions } from ".";
import { useRouter } from "next/navigation";

export const UserOptions = () => {
  const [downloadProfileLoading, setDownloadProfileLoading] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const router = useRouter();

  const downloadUserData = () => undefined;

  return (
    <div>
      <Modal
        title="Questions"
        isOpen={showQuestion}
        onClose={() => setShowQuestion(false)}
        titleClassName="!text-[2rem] text-secondary"
        className="w-5/6 px-4"
      >
        <ProfileQuestions />
      </Modal>

      <div className="flex gap-4 items-center">
        <Button
          className="w-full"
          onClick={() => setShowQuestion(!showQuestion)}
        >
          Questions
        </Button>
        <Button
          className="w-full"
          isLoading={downloadProfileLoading}
          onClick={() => downloadUserData()}
        >
          Download
        </Button>
      </div>
    </div>
  );
};
