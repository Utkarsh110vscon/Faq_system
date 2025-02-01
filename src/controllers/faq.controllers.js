import { translate } from "@vitalets/google-translate-api";
import { Faq } from "../models/faqs.js";
import { faqSchema } from "./validation.js";
import { FaqHi } from "../models/faqHi.model.js";
import { FaqBn } from "../models/faqBn.model.js";

export const getFaq = async (req, res) => {

    try {
        const faqs = await Faq.find();
        console.log(faqs);

        if (!faqs.length) {
            return res.status(404).json({
                message: 'No FAQs found at this time.',
            });
        }

        return res.status(200).json({
            message: 'FAQs retrieved successfully.',
            faq: faqs
        });

    } catch (error) {
        console.error("Error retrieving FAQs:", error);

        return res.json({
            message: 'A server error occurred. Please try again later.'
        });
    }
}

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

        const question_hi= await translate(value.question, { to: 'hi' });
        const question_bn= await translate(value.question, { to: 'bn' });
        
        const answer_hi= await translate(value.answer, { to: 'hi' });
        const answer_bn= await translate(value.answer, { to: 'bn' });

       console.log(question_hi.text+':'+answer_hi.text);
       console.log(question_bn.text+':'+answer_bn.text);

        const newFaq = await Faq.create({
            question: value.question,
            answer: value.answer,
        });

        const newFaqHi= await FaqHi.create({
            faqHiId:newFaq._id ,
            question_hi: question_hi.text,
            answer_hi: answer_hi.text,
        })

        const newFaqBn= await FaqBn.create({
            faqBnId: newFaq._id,
            question_bn:question_bn.text,
            answer_bn:answer_bn.text,
        })       

        return res.status(201).json({
            message: 'Faq question successfully created',
            faq: newFaq,
            faqHi: newFaqHi,
            faqBn: newFaqBn
        })

    } catch (error) {
        console.error("Error in Posting FAQ:", error);
        return res.status(500).json({
            message: 'A server error occurred. Please try again later.'
        });
    }
}
