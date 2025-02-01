import mongoose from "mongoose";

const FaqSchema= new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    translation: {
        question_hi: { type: String },
        question_ben: { type: String },
        question_ge: { type: String },
    },
});

export const Faq= mongoose.model('Faq', FaqSchema);