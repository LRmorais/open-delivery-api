import { Router } from 'express';
import eventsRoutes from './events.route';
import ordersRoutes from './order.route';

const router = Router();

router.use('/', eventsRoutes);
router.use('/orders',ordersRoutes)

export default router;
