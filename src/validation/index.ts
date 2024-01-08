import * as yup from "yup";

export const contactUsSchema = yup.object().shape({
  name: yup.string().min(2).required(),
  email: yup.string().email().required(),
  message: yup.string().min(2).required(),
});
