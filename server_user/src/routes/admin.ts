import { Router } from 'express';
import { createPlan, updatePlan, deletePlan, getPlans,getPlan } from '../controllers/admin';
import { getPaymentHistory } from '../controllers/paymentInfo';
//import { adminMiddleware, authMiddleware } from '../middlewares/utils/auth';

const router = Router();

router.post('/manage-subscription', createPlan);
router.put('/manage-subscription/:id',  updatePlan);
router.delete('/manage-subscription/:id',  deletePlan);
router.get('/manage-subscription/:id',  getPlan);
router.get('/manage-subscription', getPlans);
router.get('/get-payment-info', getPaymentHistory);

export default router;
