import { Request,Response,NextFunction }from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request{
    id?:string;
}

export const requireUser = async (req:CustomRequest, res:Response, next:NextFunction):Promise<void>=>{
    const token: string|undefined=req.cookies.token;
    if (!token){
        res.status(401).json({message:"Unauthorized"});
        return;
    }
    try{
        const verified:any=jwt.verify(token,process.env.JWT_SECRET_KEY!);
        req.id=verified.userId;
        next();
    } catch(error){
        res.status(400).json({message:"Invalid Token"});
    }
};
