import { Faq } from "../models/faqs.js";
import { redisClient } from "../config/redis.config.js";

export const getFaq = async (req, res) => {

    try {
        const lang = req.query.lang || 'en'

        const redisKey= `faq:${lang}`
        const cachedData= await redisClient.get(redisKey)

        if(cachedData) {
            console.log("Serving from Redis Cache");
            return res.status(200).json( JSON.parse(cachedData) )
        }

        const faqs = await Faq.aggregate([
            {
                $project:{
                    _id: 1,
                    answer: { $ifNull: [`$answer.${lang}`, '$answer.en'] },
                    question: { $ifNull: [`$question.${lang}`, '$question.en'] }
                }
            }
        ]);

        if (!faqs.length) {
            return res.status(404).json({
                message: 'No FAQs found at this time.',
            });
        }

        await redisClient.set(redisKey, JSON.stringify(faqs), 'EX', 40)

        console.log('Serving from MongoDB Database')
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
