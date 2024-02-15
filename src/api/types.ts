export interface listParams {
  queryParams?: queryParams;
  skip?: boolean;
}

export interface filterQuery {
  search?: string;
  search_keys?: string;
  [key: string]: any;
}

export interface queryParams {
  filter?: filterQuery;
  take?: number;
  page?: number;
  sort?: string;
  select?: string;
}

export interface metaResponse {
  count: number;
  take: number;
  page: number;
  pageCount: number;
}

export interface listResult {
  data: any[];
  meta: metaResponse;
}

export interface SignUpBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE";
  dob: string;
  country: string;
  phoneNumber: string;
  howDidYouHearAboutUs: string;
  confirmPassword: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  uid: string;
  token: {
    jwt: string;
    expirationDate: number;
  };
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE";
  role: "USER" | "ADMIN" | "MATCHMAKER";
  completedFirstForm: boolean;
  completedSecondForm: boolean;
  isPayingUser: boolean;
  isDeleted: boolean;
  isDisabled: boolean;
  country: string;
  numberOfUploadedImages: number;
  shouldBeOnlyWaitlisted: boolean;
  canViewTheirProfile: boolean;
  canEditTheirProfile: boolean;
  canViewAndManageTheirMatches: boolean;
  canRankOtherUsers: boolean;
  canDeleteOrDeactivateOtherUsers: boolean;
  canViewOtherUsersProfiles: boolean;
  canViewUserXProfile: boolean;
  completedTheirProfile: boolean;
  email: string;
  images: string[];
  dateOfBirth: string;
  phone: string;
}

export type AuthContextResponse = Omit<LoginResponse, "token">;

export interface EmailVerificationBody {
  email: string;
}

export interface SetPassword {
  token: string;
  password: string;
}

export type ResetPassword = EmailVerificationBody;

export type ProfileDataResponse = Partial<{
  id: string;
  first_name: string;
  last_name: string;
  country: string;
  gender: string;
  age: number;
  images: string;
  IslamRole: string;
  Passion: string;
  AboutYourself: string;
  Interests: string;
  FiveYearPlan: string;
  Height: string;
  EducationPursued: string;
  FinishedEducationLevel: string;
  JobOrFieldOfStudy: string;
  SpokenLanguages: string;
  DadOrigin: string;
  MomOrigin: string;
  Sect: string;
  MainState: string;
  MainCountry: string;
  MainCity: string;
  ResidencyCountry: string;
  Married: string;
  IslamImportance: string;
  CareerOrFamilyOriented: string;
  FinancialIndependence: string;
  FitnessLevel: string;
  WillingToMove: string;
  Origin: string;
  ClosenessToFamily: string;
  currentLocation: string;
  mostSpentLocation: string;
  mostInterestingThing: string;
}>;

export interface SupportEmailBody {
  email: string;
  name: string;
  message: string;
  subject: string;
}

export interface TypeformResponseIngestRequest {
  formId: string;
  responseId: string;
}

export type MatchPairResponse = "ACCEPTED" | "REJECTED" | "PENDING";

export type GetMatchResponse = Partial<{
  firstName: string;
  lastName: string;
  phoneNumber: string;
  images: string[];
  age: number;
  currentLocation: string;
  igHandle: string;
  userResponse: MatchPairResponse;
  matchResponse: MatchPairResponse;
  matchId: number;
  matchedUserId: string;
  message: string;
}>;

export interface MatchRejectionSurveyPayload {
  matchPhysicalAttraction: number;
  matchQuality: number;
  rejectionReason: string;
}

export type UpdateMatchRequest =
  | {
      matchId: number;
      status: "ACCEPTED";
    }
  | {
      matchId: number;
      status: "REJECTED";
      physicalAttraction: number;
      matchQuality: number;
      rejectionReason: string;
    };
