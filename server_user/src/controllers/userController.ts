import { Request, Response } from 'express';
import User from '../models/user';

interface User {
  email: string;
  password: string;
}

const loginController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('All fields are required');
    }

    const oldUser: User | null = await User.findOne({ email });
    if (!oldUser) {
      return res.status(404).send('Email is not registered');
    }

    if (oldUser.password !== password) {
      return res.status(403).send('Incorrect password');
    }

    return res.status(200).send('Login successful');

  } catch (e) {
    console.error(e);
    return res.status(500).send('Internal Server Error');
  }
};

export default loginController;
