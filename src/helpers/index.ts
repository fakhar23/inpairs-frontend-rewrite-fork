import { UserAnswer } from "@/types/ranking";

export const getAnswer = (answers: UserAnswer[], descriptor: string) => {
  return answers?.length
    ? answers.find((ans: UserAnswer) => ans.Question.descriptor == descriptor)
        ?.answer
    : "";
};
