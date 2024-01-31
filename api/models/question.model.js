import mongoose from "mongoose";

const subQuestionSchema = new mongoose.Schema({
    question: { 
        type: Array, 
        required: true 
    },
    correctAns: { 
        type: Number, 
        required: true 
    },
    marks: { 
        type: Number, 
        required: true 
    }
});

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    subQuestions: [subQuestionSchema]
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);

export default Question;