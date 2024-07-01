import mongoose, { Document, Schema, model } from "mongoose";

// interface IResourceAccess {
//     rId: mongoose.Types.ObjectId;
//     access: number;
// }

export interface IResourceGrp extends Document {
    resources: mongoose.Types.ObjectId[];
}

const resourceGrpSchema = new Schema<IResourceGrp>({
    resources: [{
       type: mongoose.Types.ObjectId,
       ref: 'Resource',
       required: true,
    }]
},{
    timestamps: true,
});

const ResourceGrp = model<IResourceGrp>('ResourceGrp', resourceGrpSchema);

export default ResourceGrp;
