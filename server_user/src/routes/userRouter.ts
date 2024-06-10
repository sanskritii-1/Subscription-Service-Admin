import { Router } from "express";
import loginController from "../controllers/userController";

const router: Router = Router();

router.post("/login", loginController);

export default router;
