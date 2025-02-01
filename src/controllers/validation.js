import Joi from "joi";

export const faqSchema = Joi.object({
    question: Joi
        .string()
        .trim()
        .required(),
    answer: Joi
        .string()
        .trim()
        .required()
});