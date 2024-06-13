import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login =async(req:Request,res:Response):Promise<void>=>{
    try{
        const{email,password} = req.body;
        if (!email ||!password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const user = await User.findOne({ email });
        if (!user){
            res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
            return;
        }
        const isPasswordMatch: boolean = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch){
            res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
            return;
        }
        const tokenData={
            userId:user.id.toString(),
        };

        const token:string = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!,{expiresIn: '1d'});

        res.status(200).cookie("token", token, {httpOnly:true,sameSite:'strict'}).json({
            success: true,
            message: "Successfully Login"
        });

    } catch (error) {
        console.log(error);
    }
};
