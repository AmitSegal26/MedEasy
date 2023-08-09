import Joi from "joi";
import validation from "./validation";
import { MESSEGES, REGEXES } from "../utils/helpersForValidation";

const loginSchema = Joi.object({
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
});

const validateLoginSchema = (userInput) => validation(loginSchema, userInput);

export default validateLoginSchema;
