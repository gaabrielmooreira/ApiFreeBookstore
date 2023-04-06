import Joi from "joi";

export const bookSchema = Joi.object({
  name: Joi.string().min(2).required(),
  author: Joi.string().required(),
  available: Joi.boolean().default(true),
  userId: Joi.number(),
});