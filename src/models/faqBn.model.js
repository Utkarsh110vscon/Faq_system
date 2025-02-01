import mongoose from "mongoose";

const FaqBnSchema= new mongoose.Schema({
    faqBnId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Faq'
    },
    question_bn: { type: String },
    answer_bn: { type:String },
});

export const FaqBn= mongoose.model('FaqBn', FaqBnSchema);