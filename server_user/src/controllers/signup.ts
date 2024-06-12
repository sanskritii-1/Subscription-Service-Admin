import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (!name || !email || !password || !confirmPassword) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        if (password !== confirmPassword) {
            res.status(400).json({ message: "Password do not match" });
            return;
        }

        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: "email already exit try different" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const tokenData = {
            userId: newUser._id.toString(),
        };

        const token: string = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, { expiresIn: '1d' });

        res.status(200).cookie("token",token,{httpOnly: true,sameSite: 'strict'}).json({
            success: true,
            message: "Successfully Login"
        });
    } catch (error) {
        console.log(error);
    }
};
