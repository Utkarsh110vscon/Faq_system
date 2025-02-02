import translate from "translation-google";
import { redisClient } from "../config/redis.config.js";
import { Faq } from "../models/faqs.js";

// export const editFaq = async (req, res) => {
//     const { answer, question } = req.body;
//     const { id } = req.params;

//     try {
//         const existingFaq = await Faq.findById(id);
//         if (!existingFaq) {
//             return res.status(404).json({ message: 'No FAQ exists with the provided ID' });
//         }

//         const updateObject = {};
//         if (question) updateObject.question.en = question;
//         if (answer) updateObject.answer.en = answer;

//         const question_hi= translate(question, { to: 'hi' });
//         const question_bn= translate(question, { to: 'bn' });
//         const answer_hi= translate(answer, { to: 'hi' });
//         const answer_bn= translate(answer, { to: 'bn' });

//         const [qu_hi, qu_bn, an_hi, an_bn]= await Promise.all([question_hi,question_bn,answer_hi,answer_bn])
//         updateObject.question.hi=qu_hi;
//         updateObject.question.bn=qu_bn;
//         updateObject.answer.hi=an_hi;
//         updateObject.answer.bn=an_bn;

//         const updatedFaq = await Faq.updateOne({ _id: id }, { $set: updateObject });

//         if (updatedFaq.modifiedCount === 0) {
//             return res.status(400).json({ message: 'No changes were made' });
//         }

//         return res.status(200).json({ message: 'Successfully updated', updatedFaq });
//     } catch (error) {
//         console.error("Error Editing FAQ:", error);
//         return res.status(500).json({ message: 'A server error occurred. Please try again later.' });
//     }
// };

export const editFaq = async (req, res) => {
    const { answer, question } = req.body;
    const { id } = req.params;
    try {
        const existingFaq = await Faq.findById(id);
        if (!existingFaq) {
            return res.status(404).json({ message: 'No FAQ exists with the provided ID' });
        }

        const updateObject = { question: {}, answer: {} };

        if (question) {
            updateObject.question.en = question;
        }
        if (answer) {
            updateObject.answer.en = answer;
        }

        if (question || answer) {
            const [qu_hi, qu_bn, an_hi, an_bn] = await Promise.all([
                question ? translate(question, { to: 'hi' }) : null,
                question ? translate(question, { to: 'bn' }) : null,
                answer ? translate(answer, { to: 'hi' }) : null,
                answer ? translate(answer, { to: 'bn' }) : null
            ]);

            if (question) {
                updateObject.question.hi = qu_hi.text;
                updateObject.question.bn = qu_bn.text;
            }
            if (answer) {
                updateObject.answer.hi = an_hi.text;
                updateObject.answer.bn = an_bn.text;
            }
        }

        console.log(updateObject)

        const updatedFaq = await Faq.updateOne({ _id: id }, { $set: updateObject });

        if (updatedFaq.modifiedCount === 0) {
            return res.status(400).json({ message: 'No changes were made' });
        }

        await redisClient.del(['faq:en', 'faq:hi', 'faq:bn']);

        return res.status(200).json({ message: 'Successfully updated', updatedFaq });
    } catch (error) {
        console.error("Error Editing FAQ:", error);
        return res.status(500).json({ message: 'A server error occurred. Please try again later.' });
    }
};
