import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import Plan, { IPlan } from '../models/plan';
import Subscription, { ISubscription } from '../models/transaction';
import {success,error} from "../utils/response";

export const getPaymentHistory = async (req: Request, res: Response) => {
  try {
    console.log("hii");
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
    res.status(200).json(paymentHistory);
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({ error: 'Error fetching payment history'});
  }
};
