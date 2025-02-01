import { Router } from "express";
import { getFaq, postFaq } from "../controllers/faq.controllers.js";

const router= Router();

router.get('/faq', (req, res) => {
    res.json({
        message: 'hello users'
    })
});

router.get('/GET/faqs', getFaq);
router.post('/POST/faqs', postFaq);
 
export default router