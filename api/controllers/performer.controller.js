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

        const performers = await Performer.find({}, 'name marks userId').sort(
            {[sort]: order}
        ).limit(limit);

        res.status(200).json(performers);
    } catch (error) {
        next(error);
    }
}

export const giveFeedback = async (req, res, next) => {
    try {
        const performer = await Performer.findById(req.params.id);
        performer.feedback = req.body.feedback;
        performer.save();
        res.status(200).json(performer);
    } catch (error) {
        next(error);
    }
}

