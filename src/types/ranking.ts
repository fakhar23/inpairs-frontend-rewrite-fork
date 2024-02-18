import { User } from "./user";

export interface UserRank {
  id: string;
  email: string;
  gender: string;
  first_name: string;
  last_name: string;
  images: string[];
  ranked: false;
  beta: false;
  created_at: string;
  UserMatchedMales?: Match[];
  UserMatchedFemales?: Match[];
  UserAnswers?: UserAnswer[];
  UserPotentialMatches?: UserPotentialMatch[];
}
export interface UserAnswer {
  id: number;
  answer: string;
  created_at?: string;
  updated_at?: string;
  question_id?: string;
  answered_by?: string;
  Question: Question;
}

export interface Question {
  id: string;
  question_text: string;
  group: string;
  descriptor: string | null;
}

export type RankingResult = {
  user: Partial<UserRank>;
  ranking: RankingItem[];
};

export interface RankingItem {
  id: number;
  rank?: number;
  less_fortunate?: boolean;
  MatchedUser: Partial<UserRank>;
  PotentialMatch: Partial<UserRank>;
}

export interface PotentialMatchInput {
  id: number;
  rank: number;
}

export interface UserPotentialMatch {
  MatchedUser: Partial<User>;
  PotentialMatch: Partial<User>;
}

export interface Match {
  id: number;
  wave_id?: number;
}
