import { metaResponse, queryParams } from "../types";

export type listParams = {
  queryParams?: queryParams;
  skip?: boolean;
};

export type scoringResult = {
  data: scoringItemResult[];
  meta: metaResponse;
};

type UserPotentialMatches = {
  id: number;
};

export type scoringItemResult = {
  id: string;
  first_name: string;
  last_name: string;
  ranked: boolean | null;
  UserPotentialMatches: UserPotentialMatches[];
};
