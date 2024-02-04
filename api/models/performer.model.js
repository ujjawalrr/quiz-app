import mongoose from "mongoose";

const performerSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    correctQuestions: {
        type: Number,
        required: true
    },
    incorrectQuestions: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    evaluatedQuestions: {
        type: Object,
        required: true
    },
    feedback: {
        type: Number
    }
}, { timestamps: true });

const Performer = mongoose.model('Performer', performerSchema);

export default Performer;