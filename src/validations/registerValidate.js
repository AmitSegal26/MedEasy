import Joi from "joi";
import validation from "./validation";
import { MESSEGES, REGEXES } from "../utils/helpersForValidation";

const registerSchema = Joi.object({
  first: Joi.string().min(2).max(256).required(),
  last: Joi.string().min(2).max(256).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(256)
    .messages({ "string.email": MESSEGES.EMAIL })
    .required(),
  password: Joi.string()
    .regex(REGEXES.PASSWORD)
    .message(MESSEGES.PASSWORD)
    .max(100)
    .required(),
  image: Joi.object({
    imageFile: Joi.any(),
    imageAlt: Joi.string().min(6).max(256).allow(""),
  }),
});

const validateRegisterSchema = (userInput) =>
  validation(registerSchema, userInput);

export default validateRegisterSchema;
