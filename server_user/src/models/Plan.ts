import { Schema, model } from 'mongoose';

const planSchema = new Schema({
  name: { type: String, required: true },
  features: { type: String, required: true },
  resources: { type: Number, required: true, },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
},{
  timestamps: true,
}
);

const Plan = model('Plan', planSchema);
export default Plan;
