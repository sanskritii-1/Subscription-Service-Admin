import { Router } from 'express';
import { getPaymentHistory } from '../controllers/paymentInfo';
import { adminMiddleware } from "../middlewares/auth";
import { getPlanDetails } from '../controllers/planAnalytic';
import { getUserResourceDetails } from '../controllers/userAnalytic';

const router = Router();


router.get('/get-payment-info', adminMiddleware, getPaymentHistory);
router.get('/plan-analytics',adminMiddleware, getPlanDetails);
router.get('/user-analytics', adminMiddleware, getUserResourceDetails);

export default router;
