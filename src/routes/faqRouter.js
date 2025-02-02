import { Router } from "express";
import { getFaq } from "../controllers/faq.get.controller.js";
import { postFaq } from "../controllers/faq.post.controller.js";
import { deleteFaq } from "../controllers/faq.del.controller.js";
import { redisClient } from "../config/redis.config.js";

const router= Router();

router.get('/faq', async(req, res) => {
    const data = await redisClient.keys("*");
    res.json({
        message: 'hello users'
    })
});

router.get('/GET/faqs', getFaq);
router.post('/POST/faqs', postFaq);
router.delete('/DELETE/faqs/:id', deleteFaq);
 
export default router