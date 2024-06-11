import { Request, Response} from 'express';
import Plan from '../models/Plan';


export const createPlan = async (req: Request, res: Response) => {
  const { name, features, price, duration } = req.body;
  
  try {
    const plan = new Plan({ name, features, price, duration });
    await plan.save();
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create plan' });
  }
};


export const updatePlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, features, price, duration } = req.body;
  
  try {
    const plan = await Plan.findByIdAndUpdate(id, { name, features, price, duration }, { new: true });
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update plan' });
  }
};


export const deletePlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const plan = await Plan.findByIdAndDelete(id);
    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete plan' });
  }
};
