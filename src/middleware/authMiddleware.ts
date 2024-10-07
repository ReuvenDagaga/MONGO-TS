import { Request, Response, NextFunction } from "express";
import jsonwebtoken from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?:{userId: string}
}


export const authAddGame = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
        res.status(400).json({message: "Access denied"});
        return;       
    }
    try {
        const decoded = jsonwebtoken.verify(token, "REUVEN_CODE") as {userId: string};
        req.user = decoded;
        next();
    } 
    catch (error) {
        res.status(401).json({message: "Access denied bro"});
    }
}
