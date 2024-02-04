import Performer from "../models/performer.model.js";
import { errorHandler } from "../utils/error.js";

export const createPerformer = async (req, res, next) => {
    try {
        const performer = await Performer.create(req.body);
        return res.status(201).json(performer);
    } catch (error) {
        next(error)
    }
};

export const getPerformers = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit);

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        const performers = await Performer.find({}).sort(
            {[sort]: order}
        ).limit(limit);

        res.status(200).json(performers);
    } catch (error) {
        next(error);
    }
}

export const giveFeedback = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const performer = await Performer.findOne({userId});
        performer.feedback = req.body.feedback;
        performer.save();
        res.status(200).json(performer);
    } catch (error) {
        next(error);
    }
}

