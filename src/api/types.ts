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
  firstName: string;
  lastName: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dob: string;
  country: string;
  phoneNumber: string;
  howDidYouHearAboutUs: string;
  confirmPassword: string;
}

export interface EmailVerificationBody {
  email: string;
}
