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
        titleClassName="!text-[2rem] text-purple"
        className="w-5/6 px-4"
      >
        <ProfileQuestions />
      </Modal>

      <div className="flex gap-4 items-center">
        <Button
          className="w-full"
          content="Questions"
          onClick={() => setShowQuestion(!showQuestion)}
        />
        <Button
          className="w-full"
          content="Download"
          isLoading={downloadProfileLoading}
          onClick={() => downloadUserData()}
        />
      </div>
    </div>
  );
};
