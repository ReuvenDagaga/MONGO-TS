import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import Game from '../models/Game';
import bcrypt from 'bcrypt';

export const addGame = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { title, genre, price, releaseDate, publisher, tags } = req.body;

        //check if user already exist
        const existingGame = await Game.findOne({ title })
        if (existingGame) {
            res.status(400).json({message: "game already exist"});
            return;
        }
        // const verifyToken = await 
        
        const newGame = new Game({
            title, 
            genre, 
            price, 
            releaseDate, 
            publisher, 
            tags
        });
        await newGame.save();
        res.status(201).json(newGame)
    }

    catch (err) {
        res.status(500).json({message: "Error registering user"})
    }
}