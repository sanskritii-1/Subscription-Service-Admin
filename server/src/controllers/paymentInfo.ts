import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/user';
import Plan, { IPlan } from '../models/plan';
import Subscription, { ISubscription } from '../models/subscription';
import {success} from "../utils/response";
import Transaction, { ITransaction } from '../models/transaction';
import { CustomError } from '../middlewares/error';

export const getPaymentHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subscriptions = await Subscription.find()  
      
      console.log("hii2");

    const paymentHistory = await Promise.all(subscriptions.map(async (subscription) => {
      const user = await User.findOne<IUser>({_id: subscription.userId});
      const plan = await Plan.findOne<IPlan>({_id: subscription.planId});
      return {
        id: subscription._id,
        userName: user?.name,    
        userEmail: user?.email,   
        planName: plan?.name,     
        startDate: subscription.startDate,
        endDate: subscription.endDate,
        status: subscription.endDate > new Date() ? 'active' : 'expired',
      };
    })
  );
    return res.status(200).json(success(200,{paymentHistory}));
  } catch (error) {
    console.error('Error fetching payment history:', error);
    next(error);
  }
};


export const getTransactions = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
  try {
    const records = await Transaction.find<ITransaction>();
    if(!records){
      const err: CustomError = new Error("No transaction records found");
      err.status = 404;
      return next(err);
    }

    const paymentHistory = await Promise.all(records.map(async (subscription) => {
      const user = await User.findById<IUser>(subscription.userId);
      const plan = await Plan.findById<IPlan>(subscription.planId);
      return {
        id: subscription._id,
        userName: user?.name,    
        userEmail: user?.email,   
        planName: plan?.name, 
        amount: subscription.amount,    
        date: subscription.updatedAt,
        paymentMethod: subscription.paymentMethod,
        status: subscription.status,
      };
    }))

    return res.status(200).json(success(200,{paymentHistory}));
    
  } catch (err) {
    next(err);
  }
}