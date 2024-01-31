import * as yup from "yup";

export const contactUsSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  message: yup.string().required(),
  subject: yup.string().required(),
});
