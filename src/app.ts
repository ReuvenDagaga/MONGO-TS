import express from 'express';
import { connectToMongo } from './DAL/DB';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute';


dotenv.config();

const app = express();
const PORT = process.env.PORT;


//Middleware - Body parser
app.use(express.json());

//Middleware - Connect to mongo
connectToMongo();

app.use('/', userRouter)


app.listen(PORT, () => {
    try {
        console.log("Server listening to port" + PORT);
    }
    catch (err) {
        console.log("error cannot listen to port" + PORT); 
    }  
})



