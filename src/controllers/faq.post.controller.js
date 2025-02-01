import { Faq } from "../models/faqs.js";
import { faqSchema } from "./validation.js";
import { translate } from "@vitalets/google-translate-api";

export const postFaq = async (req, res) => {
    try {

        const { value, error } = faqSchema.validate(req.body);
        if (error) {
            console.log(error.details);
            return res.status(400).json({ message: error.details[0].message });
        }

        const existingFaq = await Faq.findOne({
            question: value.question
        });

        //here i have considered that dublicate faqs questions are not allowed.
        if (existingFaq) {
            console.log(existingFaq)
            return res.status(409).json({
                message: 'FAQ question already exists.'
            })
        }

        const question_hi= translate(value.question, { to: 'hi' });
        const question_bn= translate(value.question, { to: 'bn' });
        const answer_hi= translate(value.answer, { to: 'hi' });
        const answer_bn= translate(value.answer, { to: 'bn' });

        const [qu_hi, qu_bn, an_hi, an_bn]= await Promise.all([question_hi,question_bn,answer_hi,answer_bn])

        const newFaq = await Faq.create({
            question:{
                en: value.question,
                hi: qu_hi.text,
                bn: qu_bn.text
            },
            answer: {
                en: value.answer,
                hi: an_hi.text,
                bn: an_bn.text
            },
        });

        return res.status(201).json({
            message: 'Faq question successfully created',
            faq: newFaq,
        })

    } catch (error) {
        console.error("Error in Posting FAQ:", error);
        return res.status(500).json({
            message: 'A server error occurred. Please try again later.'
        });
    }
}