import { Router } from 'express';
import authRoute from "./authRoute";
import v1Routes from './v1/index.route';

const router = Router();

router.use('/oauth', authRoute);
router.use('/v1', v1Routes);

export default router;
