import Joi from "joi";
import validation from "./validation";

const cardScheme = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  stock: Joi.number().min(0).required(),
  price: Joi.number().min(0).required(),
  contains: Joi.number().min(0).required(),
  image: Joi.object().keys({
    imageFile: Joi.any(),
    alt: Joi.string().min(2).max(256).required(),
  }),
});

const vaildateCardScheme = (userInput) => validation(cardScheme, userInput);

export default vaildateCardScheme;
