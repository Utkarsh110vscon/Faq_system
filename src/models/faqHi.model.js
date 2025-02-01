import mongoose from "mongoose";

const FaqHiSchema= new mongoose.Schema({
    faqHiId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Faq'
    },
    question_hi: { type: String },
    answer_hi: { type:String },
    
});

export const FaqHi= mongoose.model('FaqHi', FaqHiSchema);