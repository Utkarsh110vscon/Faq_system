import { Router } from "express";
import { getFaq } from "../controllers/faq.get.controller.js";
import { postFaq } from "../controllers/faq.post.controller.js";
import { deleteFaq } from "../controllers/faq.del.controller.js";

const router= Router();

router.get('/faq', (req, res) => {
    res.json({
        message: 'hello users'
    })
});

router.get('/GET/faqs', getFaq);
router.post('/POST/faqs', postFaq);
router.delete('/DELETE/faqs/:id', deleteFaq);
 
export default router