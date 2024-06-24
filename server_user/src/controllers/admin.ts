import { Request, Response } from 'express';
import Plan from '../models/plan';
import Joi from 'joi';
import {success,error} from "../utils/response";

const planSchema = Joi.object({
  name: Joi.string().required(),
  features: Joi.string().allow('').optional(),
  resources: Joi.number().required(),
  price: Joi.number().required(),
  duration: Joi.number().required(),
});

export const createPlan = async (req: Request, res: Response) => {
  const { error } = planSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const plan = new Plan(req.body);
    await plan.save();
    return res.status(200).json(success(200,{ message: 'Plan added successfully',plan}));
    //res.status(201).json(plan);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

export const updatePlan = async (req: Request, res: Response) => {
  const { error } = planSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    return res.status(200).json(success(200,{ message: 'Plan updated successfully',plan}));
    //res.status(200).json(plan);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

export const deletePlan = async (req: Request, res: Response) => {
  try {
    const plan = await Plan.findByIdAndDelete(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    return res.status(200).json(success(200,{ message: 'Plan deleted successfully' }));
   // res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getPlan = async (req: Request, res: Response) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    return res.status(200).json(success(200,{plan}));
    //res.status(200).json(plan);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};


export const getPlans = async (req: Request, res: Response) => {
  try {
    const plans = await Plan.find();
    if(plans.length == 0) return res.status(404).json({error: "No subscription plans found"});
    return res.status(200).json(success(200,{plans}));
    // res.status(200).json(plans);
  } catch (error) {
     return res.status(500).json({ error: 'Server error' });
  }
};
