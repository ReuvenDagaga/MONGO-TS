import { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/User';
import bcrypt from 'bcrypt';

export const registerUser = async(req: Request, res: Response): Promise<void> => {
    try {
        const { userName, email, password } = req.body;
        //check if user already exist
        const existingUser = await User.findOne({email})
        if (existingUser) {
            res.status(400).json({message: "user already registered"});
            return;
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            userName,
            email,
            password: hashPassword
        });
        await newUser.save();
        res.status(201).json(newUser)
    }

    catch (err) {
        res.status(500).json({message: "Error registering user"})
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "invalid user" })
            return;
        } 

        const isPassword: boolean = await bcrypt.compare(password, user.password);

        if (!isPassword) {
            res.status(400).json({ message: "invalid password" })
            return;
        }

        const token = jsonwebtoken.sign({id: user._id}, "REUVEN_CODE", {expiresIn:"4h"});
        res.json({token});
    } 
    catch (error) {
        res.status(500).json({message: "Server is failed" + error})   
    }
}
