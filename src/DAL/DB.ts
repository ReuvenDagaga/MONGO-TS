import mongoose from 'mongoose';

export const connectToMongo = async (): Promise<void> => {
    try {
        if (!process.env.MONGODB) {
            throw new Error("ENV mongoUri is not defied")
        }
        await mongoose.connect(process.env.MONGODB);
        console.log("connect to mongo Successfully");
    }
    catch (err) {
        console.log("Error + ", err);
        process.exit(1);
    }
} 