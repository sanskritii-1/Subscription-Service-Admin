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

connectDB();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript + Node.js + Express!');
});
app.use("/api", adminRouter);

export default app;