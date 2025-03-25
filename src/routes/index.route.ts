import { Router } from 'express';
import authRoute from "./authRoute";

const router = Router();

router.use('/oauth', authRoute);

export default router;
