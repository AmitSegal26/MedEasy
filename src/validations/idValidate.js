import Joi from "joi";
import validation from "./validation";

const idSchema = Joi.string().hex().length(24);

const validateIdSchema = (userInput) => validation(idSchema, userInput);

export default validateIdSchema;
