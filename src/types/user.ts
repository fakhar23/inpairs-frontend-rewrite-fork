export interface User {
  id?: number;
  sharableId: string;
  username: string;
  email: string;
  dob: Date;
  gender: "MALE" | "FEMALE" | "OTHER";
  role: string;
  profileCompletionPercentage: number;
  country: string;
  images: string[];
  isBetaUser: boolean;
  eligibility: {
    message: string;
    allowed: boolean;
  };
  state?: string;
  completed_first_form?: boolean;
  completed_second_form?: boolean;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  first_name?: string;
  last_name?: string;
  subscribed?: boolean;
  ranked?: boolean;
  paymentFilled?: boolean;
  questionsAnswers?: {
    [key: string]: {
      answer: string;
      key: string;
      answer_id: number;
      question: string;
    };
  };
  stats?: {
    match_current: number;
    match_total: number;
    member_months: number;
  };
  isUSOrCanadaUser: boolean;
  in_pool?: boolean;
  auth_id?: string;
  UPMMatched?: Array<{
    id: number;
    user_id: number;
    match_user_id: number;
    score: number;
    rank: number;
  }>;
  created_at?: string;
}

export interface UpdatePercentageBody {
  percent: number;
}

export interface UpdateAnswerBody {
  answerId: number;
  answer: string;
  questionKey: string;
}

export interface UpdatePaymentBody {
  paymentFilled: boolean;
  subscribed: boolean;
}
export interface UpdateProfileBody {
  images: string[];
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  igHandle: string;
  gender: string;
  birthdate: string;
  height: string;
  education: string;
  job: string;
  languages: string;
  moreThanEthnicity: string;
  origin: string;
  mostSpentState: string;
  mostSpentCity: string;
  sect: string;
  beenMarried: string;
}

export interface SendContactUsEmailBody {
  name: string;
  email: string;
  message: string;
}

export interface UpdateMatchStatusBody {
  matchId: string;
  status: "ACCEPTED" | "REJECTED";
  reason?: string;
}
