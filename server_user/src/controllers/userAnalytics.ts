import { Request, Response, NextFunction } from 'express';
import UserResource from '../models/userResource';
import User, { IUser } from '../models/user';
import Subscription from '../models/transaction';
import Plan from '../models/plan';
import { success, error } from '../utils/response';
import mongoose from 'mongoose';

export const getUserResourceDetails = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 2;
        const skip = (page - 1) * limit;
        //const keyword = req.query.keyword?.toString().toLowerCase();

        const keyword = req.query.keyword;
        console.log(keyword);

        const conditions: any = {};

        if (keyword) {
           // const namee={$regex: new RegExp(keyword,'i')}
           // console.log(namee);
            
            const users = await User.find({name:{ $regex: keyword,$options:'i' }}, '_id').lean() as Array<IUser & { _id: string }>;
            const userIds = users.map(user => user._id);
            conditions.userId = { $in: userIds };
            console.log(conditions.userId );
        }

        const userResources = await UserResource.find(conditions, 'userId leftResources')
            .skip(skip)
            .limit(limit);

        if (!userResources.length) {
            return res.status(404).json(error(404, 'No user found'));
        }

        const userDetails = await Promise.all(userResources.map(async (userResource) => {
            const userId = userResource.userId;
            const user = await User.findById(userId, 'name email');
            const subscription = await Subscription.findOne({ userId }).sort({ startDate: -1 }).select('planId');
            const planId = subscription ? subscription.planId : null;
            const plan = planId ? await Plan.findById(planId, 'name') : null;

            const accessedResources = await UserResource.aggregate([
                { $match: { userId: userId } },
                { $unwind: '$resourceAccess' },
                {
                    $lookup: {
                        from: 'resources',
                        localField: 'resourceAccess.rId',
                        foreignField: '_id',
                        as: 'resourceDetails'
                    }
                },
                { $unwind: '$resourceDetails' },
                {
                    $project: {
                        title: '$resourceDetails.title',
                        access: '$resourceAccess.access'
                    }
                }
            ]);

            return {
                userId: userId,
                userName: user?.name,
                userEmail: user?.email,
                // leftResources: userResource.leftResources,
                accessedResources,
                planName: plan ? plan.name : 'No active plan',
            };
        }));

        const totalCount = await UserResource.countDocuments(conditions);

        return res.status(200).json(success(200, {
            userDetails,
            pagination: {
                total: totalCount,
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit),
            },
        }));
    } catch (err) {
        next(err);
    }
};


// import { Request, Response, NextFunction } from 'express';
// import UserResource from '../models/userResource';
// import User from '../models/user';
// import Subscription from '../models/transaction';
// import Plan from '../models/plan';
// import { success, error } from '../utils/response';

// export const getUserResourceDetails = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
//     try {
        
//         const page = parseInt(req.query.page as string) || 1;
//         const limit = parseInt(req.query.limit as string) || 10;
//         const skip = (page - 1) * limit;

//         const userResources = await UserResource.find({}, 'userId leftResources')
//             .skip(skip)
//             .limit(limit);

//         if (!userResources.length) {
//             return res.status(404).json(error(404, 'No user resources found'));
//         }

//         const userDetails = await Promise.all(userResources.map(async (userResource) => {
//             const userId = userResource.userId;
//             const user = await User.findById(userId, 'name email');
//             const subscription = await Subscription.findOne({ userId }).sort({ startDate: -1 }).select('planId');
//             const planId = subscription ? subscription.planId : null;
//             const plan = planId ? await Plan.findById(planId, 'name') : null;

//             return {
//                 userId: userId,
//                 userName: user?.name,
//                 userEmail: user?.email,
//                 leftResources: userResource.leftResources,
//                 planName: plan ? plan.name : 'No active plan',
//             };
//         }));

//         const totalCount = await UserResource.countDocuments();

//         return res.status(200).json(success(200, {
//             userDetails,
//             pagination: {
//                 total: totalCount,
//                 page,
//                 limit,
//                 totalPages: Math.ceil(totalCount / limit),
//             },
//         }));
//     } catch (err) {
//         next(err);
//     }
// };





  // if (keyword){
        //     console.log(keyword);
        //     const userrId= await User.find({name:keyword},'userId');
        //     console.log("userId",userrId);
            
        //     userResources= await UserResource.find({userId:userrId},'userId leftResources'); 
        //     console.log("userResources",userResources);
        // }

        // const userResources = await UserResource.find(conditions, 'userId leftResources')
        //     .skip(skip)
        //     .limit(limit);

