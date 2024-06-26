// import { Request, Response, NextFunction } from 'express';
// import UserResource from '../models/userResource';
// import User from '../models/user';
// import Subscription from '../models/transaction';
// import Plan from '../models/plan';
// import { success, error } from '../utils/response';

// export const getUserResourceDetails = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
//     try {
//         // Extract page, limit, and keyword from query parameters
//         const page = parseInt(req.query.page as string) || 1;
//         const limit = parseInt(req.query.limit as string) || 1;
//         const skip = (page - 1) * limit;
//         const keyword = req.query.keyword?.toString().toLowerCase();

//         // Prepare conditions for filtering
//         const conditions: any = {};
//         if (keyword) {
//             conditions.name = { $regex: new RegExp(keyword, 'i') }; // Assuming 'name' is the field in User model
//         }

//         // Fetch user resources with pagination and filtering
//         const userResources = await UserResource.find(conditions, 'userId leftResources')
//             .skip(skip)
//             .limit(limit);

//         if (!userResources.length) {
//             return res.status(404).json({error:'No user resources found'});
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

//         // Get the total count of user resources
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

import { Request, Response, NextFunction } from 'express';
import UserResource from '../models/userResource';
import User from '../models/user';
import Subscription from '../models/transaction';
import Plan from '../models/plan';
import { success, error } from '../utils/response';

export const getUserResourceDetails = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const userResources = await UserResource.find({}, 'userId leftResources')
            .skip(skip)
            .limit(limit);

        if (!userResources.length) {
            return res.status(404).json(error(404, 'No user resources found'));
        }

        const userDetails = await Promise.all(userResources.map(async (userResource) => {
            const userId = userResource.userId;
            const user = await User.findById(userId, 'name email');
            const subscription = await Subscription.findOne({ userId }).sort({ startDate: -1 }).select('planId');
            const planId = subscription ? subscription.planId : null;
            const plan = planId ? await Plan.findById(planId, 'name') : null;

            return {
                userId: userId,
                userName: user?.name,
                userEmail: user?.email,
                leftResources: userResource.leftResources,
                planName: plan ? plan.name : 'No active plan',
            };
        }));

        const totalCount = await UserResource.countDocuments();

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

