export type metaResponse = {
  count: number;
  take: number;
  page: number;
  pageCount: number;
};

export type filterQuery = {
  search?: string;
  search_keys?: string;
  ranked?: boolean | "true" | "false" | "" | string;
};

export type queryParams = {
  filter?: filterQuery;
  take?: number;
  page?: number;
  sort?: string;
  select?: string;
};


export interface SignUpBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE" | "OTHER";
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
    expirationDate: 1705763642000;
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
}>;

export interface SupportEmailBody {
  email: string;
  name: string;
  message: string;
  subject: string;
}
