import mongoose from "mongoose";

const FaqSchema= new mongoose.Schema({
    question: {
        en: { type: String, required: true },
        hi: { type: String },
        bn: { type: String },
    },
    answer: {
        en: { type: String, required: true },
        hi: { type: String },
        bn: { type: String },
    }, 
});

export const Faq= mongoose.model('Faq', FaqSchema);