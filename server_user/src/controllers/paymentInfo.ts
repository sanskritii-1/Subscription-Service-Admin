import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import Plan, { IPlan } from '../models/Plan';
import Subscription, { ISubscription } from '../models/subscription';

export const getPaymentHistory = async (req: Request, res: Response) => {
  try {
    console.log("hii");
    const subscriptions = await Subscription.find()
      .populate('userId', 'name email') 
      .populate('planId', 'name');   
      
      console.log("hii2");

    const paymentHistory = subscriptions.map(subscription => {
      return {
        id: subscription._id,
        userName: (subscription.userId as IUser).name,    
        userEmail: (subscription.userId as IUser).email,   
        planName: (subscription.planId as IPlan).name,     
        startDate: subscription.startDate,
        endDate: subscription.endDate,
        status: subscription.endDate > new Date() ? 'active' : 'expired',
      };
    });

    res.status(200).json(paymentHistory);
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
