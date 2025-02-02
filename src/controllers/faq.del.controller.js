import { redisClient } from "../config/redis.config.js";
import { Faq } from "../models/faqs.js";

export const deleteFaq = async (req, res) => {
    try {
        const delFaq = await Faq.findByIdAndDelete(req.params.id);

        if (!delFaq) {
            return res.status(404).json({
                message: 'FAQ NOT FOUND!'
            });
        }

        await redisClient.del(['faq:en', 'faq:hi', 'faq:bn']);

        return res.status(204).send();

    } catch (error) {
        console.error("Error deleting FAQ:", error);
        return res.status(500).json({
            message: 'A server error occurred. Please try again later.'
        });
    }
};
