import { NextFunction, Request, Response } from 'express';
import Plan, { IPlan } from '../models/plan';
import Joi from 'joi';
import { success, error } from "../utils/response";
import ResourceGrp, { IResourceAccess, IResourceGrp } from '../models/resourceGrp';
import Resource, { IResource } from '../models/resources';
import { CustomError } from '../middlewares/error';
import mongoose from 'mongoose';

const planSchema = Joi.object({
  name: Joi.string().required(),
  features: Joi.string().allow('').optional(),
  resources: Joi.number().required(),
  price: Joi.number().required(),
  duration: Joi.number().required(),
  resourceArray: Joi.array().required(),
});

export const createPlan = async (req: Request, res: Response) => {
  const { error } = planSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    console.log('res array: ', req.body.resourceArray);
    const resourceArray: IResourceAccess[] = req.body.resourceArray;
    const grpExist = await ResourceGrp.findOne<IResourceGrp>({resources: resourceArray});
    let grpId: mongoose.Types.ObjectId;
    if(!grpExist){
      const newGrp = new ResourceGrp({resources: resourceArray});
      await newGrp.save();
      grpId = newGrp._id as mongoose.Types.ObjectId;;
    }
    else{
      grpId = grpExist._id as mongoose.Types.ObjectId;;
    }
    const plan = new Plan({
      name: req.body.name,
      resources: req.body.resources, 
      price: req.body.price, 
      duration: req.body.duration, 
      grpId
    });
    await plan.save();
    return res.status(200).json(success(200, { message: 'Plan added successfully', plan }));
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
    return res.status(200).json(success(200, { message: 'Plan updated successfully', plan }));
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
    return res.status(200).json(success(200, { message: 'Plan deleted successfully' }));
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
    return res.status(200).json(success(200, { plan }));
    //res.status(200).json(plan);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};


export const getPlans = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const plans = await Plan.find<IPlan>();

    if (plans.length == 0) return res.status(404).json({ error: "No subscription plans found" });

    const planData = await Promise.all(plans.map(async (plan) => {
      const titles = await ResourceGrp.aggregate([
        { $match: { _id: plan.grpId } },
        { $unwind: '$resources' },
        {
          $lookup: {
            from: 'resources',
            localField: 'resources.rId',
            foreignField: '_id',
            as: 'resourceDetails'
          }
        },
        { $unwind: '$resourceDetails' },
        {
          $project: {
            title: '$resourceDetails.title',
            access: '$resources.access'
          }
        }
      ]);

      return {
        _id: plan._id,
        name: plan.name,
        price: plan.price,
        resources: plan.resources,
        features: plan.features,
        duration: plan.duration,
        titles
      }
    }))

    return res.status(200).json(success(200, { planData }));
    // res.status(200).json(plans);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};


export const getResources = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const resources = await Resource.find<IResource>({}, 'title description url');
    if (!resources) {
      const err: CustomError = new Error("No resources found");
      err.status = 400;
      return next(err)
    }

    return res.status(200).json(success(200, { resources }))
  } catch (error) {
    next(error);
  }
}