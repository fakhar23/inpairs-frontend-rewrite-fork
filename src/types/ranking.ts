export interface UserAnswer {
  id: string;
  answer: string;
  Question: Question;
}

export interface Question {
  id: string;
  question_text: string;
  descriptor: string;
}
