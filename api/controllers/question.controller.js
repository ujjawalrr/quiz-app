import Question from "../models/question.model.js";
import { errorHandler } from "../utils/error.js";

export const createQuestion = async (req, res, next) => {
    try {
        const question = await Question.create(req.body);
        return res.status(201).json(question);
    } catch (error) {
        next(error)
    }
};

export const getQuestion = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id);
        if(!question) {
            return next(errorHandler(404, 'Question not found!'));
        }
        res.status(200).json(question);
    } catch (error) {
        next(error);
    }
}

export const getQuestions = async (req, res, next) => {
    try {
        let type = req.query.type;

        if(type === undefined || type === 'all'){
            type = { $in: ['mcq', 'match', 'fill'] };
        }

        const questions = await Question.find({ type });
        res.status(200).json(questions);
    } catch (error) {
        next(error);
    }
}