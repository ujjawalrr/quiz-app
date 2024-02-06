import User from "../models/User.model.js";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    try {
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = newUser._doc;
        res
            .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
            .status(201)
            .json(rest)
    } catch (error) {
        next(error)
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, "User not found!"));
        const validPassword = await bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Wrong Password!"));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res
            .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
            .status(200)
            .json(rest)
    } catch (error) {
        next(error)
    }
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res
                .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({ name: req.body.name, email: req.body.email, password: hashedPassword });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res
                .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) })
                .status(200)
                .json(rest);
        }

    } catch (error) {
        next(error)
    }
};

export const logout = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json("User has been logged out!");
    } catch (error) {
        next(error)
    }
};

export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }
        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 300000; // Token expires in 5 minutes
        await user.save();

        // Send email with reset link
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'josaacounsellors@gmail.com',
                pass: process.env.MAIL
            }
        })
        const mailOptions = {
            from: 'josaacounsellors@gmail.com',
            to: user.email,
            subject: 'Password Reset Request',
            text: `Click on this link to reset your password: http://localhost:5173/reset/${resetToken}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return next(errorHandler(500, "Can't send reset link!"));
            }
        });

        res.status(200).json(`Reset link sent on mail ${user.email}`);
    } catch (error) {
        next(error);
    }
};

export const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Find user by reset token
        const user = await User.findOne({ resetPasswordToken: token });

        if (!user) {
            return next(errorHandler(400, 'Invalid or expired link'));
        }

        // Check if token is expired
        if (user.resetPasswordExpires < Date.now()) {
            return next(errorHandler(400, ' Reset link has expired'));
        }

        // Hash password and save to user
        const hashedPassword = bcryptjs.hashSync(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json('Password reset successful');
    } catch (error) {
        next(error);
    }
};