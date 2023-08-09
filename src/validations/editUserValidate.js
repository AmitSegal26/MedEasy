import Joi from "joi";
import validation from "./validation";
import { MESSEGES } from "../utils/helpersForValidation";

const editUserSchema = Joi.object({
  first: Joi.string().min(2).max(256).required(),
  last: Joi.string().min(2).max(256).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(256)
    .messages({ "string.email": MESSEGES.EMAIL })
    .required(),
  image: Joi.object({
    imageFile: Joi.any(),
    imageAlt: Joi.string().min(6).max(256).allow(""),
  }),
});

const validateEditUserSchema = (userInput) =>
  validation(editUserSchema, userInput);

export default validateEditUserSchema;
