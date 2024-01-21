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
}

export interface EmailVerificationBody {
  email: string;
}
