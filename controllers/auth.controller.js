import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // create new user
        const { username, email, password } = req.body;

        // cheeck if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUsers = new User([{
            username,
            email,
            password: hashedPassword
        }], { session });

        // jwt token generation
        const token = jwt.sign({ id: newUsers[0]._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                token,
                user: newUsers[0]
            }
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {}

export const signOut = async (req, res, next) => {}