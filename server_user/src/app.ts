import express, { Request, Response, Express } from 'express';
import cors from "cors";
import User, { IUser } from './models/user';
import connectDB from './config/dbConfig';
import userRouter from './routes/user'
import adminRouter from './routes/admin'

// Create an Express application
const app:Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/admin", adminRouter);

// connectDB();
const mongoose=require("mongoose");

function mongoConnect(){
    
    const url="mongodb+srv://naman:naman@cluster0.lu8git5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    async function isConnect(){
        try{
            await mongoose.connect(url,{
                useNewUrlParser:true,
                useUnifiedTopology:true
            })
            console.log(`mongo connected`);
        }
        catch(error){
            console.log('error while connecting',error);
            process.exit(1);
        }
    }
    isConnect();
}
mongoConnect();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript + Node.js + Express!');
});
// app.use("/api", userRouter, subscriptionrouter);
export default app;