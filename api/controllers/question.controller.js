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
        if (!question) {
            return next(errorHandler(404, 'Question not found!'));
        }
        res.status(200).json(question);
    } catch (error) {
        next(error);
    }
}

export const getOptions = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return next(errorHandler(404, 'Question not found!'));
        }
        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
          }
          const options = question.subQuestions.map(obj => obj.correctAns);
          const shuffledOptions = shuffle(options);
        res.status(200).json(shuffledOptions);
    } catch (error) {
        next(error);
    }
}

export const getQuestions = async (req, res, next) => {
    const { type, includeCorrectAns } = req.query;
    try {
        let matchQuery = {};
        if (type) {
            matchQuery = { type: type.toLowerCase() };
        }

        const projection = {
            title: 1,
            type: 1,
            subQuestions: {
                $map: {
                    input: "$subQuestions",
                    as: "subQuestion",
                    in: {
                        question: "$$subQuestion.question",
                        marks: "$$subQuestion.marks",
                        correctAns: {
                            $cond: {
                                if: { $eq: [includeCorrectAns, 'true'] },
                                then: "$$subQuestion.correctAns",
                                else: "$$REMOVE"
                            }
                        },
                        _id: "$$subQuestion._id"
                    }
                }
            }
        };

        const questions = await Question.aggregate([
            { $match: matchQuery },
            { $project: projection }
        ]);
        if (!questions) {
            return next(errorHandler(404, 'Questions not found!'));
        }
        res.status(200).json(questions);
    } catch (error) {
        next(error);
    }
}

export const evaluateQuestion = async (req, res, next) => {
    const { questionId, subQuestionId, markedAns } = req.body;
    try {
        const question = await Question.findById(questionId);

        if (!question) {
            return next(errorHandler(404, 'Question not found!'));
        }

        const subQuestion = question.subQuestions.id(subQuestionId);

        if (!subQuestion) {
            return next(errorHandler(404, 'subQuestion not found!'));
        }
        if (markedAns == subQuestion.correctAns) {
            return res.status(200).json({status: true, marks: subQuestion.marks});
        }

        res.status(200).json({status: false});
    } catch (error) {
        next(error);
    }
}
