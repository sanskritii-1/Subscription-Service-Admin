import mongoose, { Document } from "mongoose";
import { IUser } from "./user";

interface IResourceAccess {
    rId: mongoose.Types.ObjectId;
    access: number;
}

export interface IUserResources extends Document {
    userId: mongoose.Types.ObjectId | IUser,
    resourceAccess: IResourceAccess[],
}

const userResourceSchema = new mongoose.Schema<IUserResources>({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    resourceAccess: {
        type: [{
            rId: {
                type: mongoose.Types.ObjectId,
                ref: 'Resource',
                required: true,
                index: true,
            },
            access: {
                type: Number,
                required: true,
            }
        }],
        required: true,
        unique: true,
    }
},
    {
        timestamps: true,
    }
)

const UserResource = mongoose.model<IUserResources>("UserResource", userResourceSchema);

export default UserResource;