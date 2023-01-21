import express from 'express';
import { create_new_order,
    get_all_orders,
    get_new_orders,
    update_order_status
} from '../services/order-service.js';
import { protectedMiddleware } from '../middlewares/protected-middleware.js';

const router = express.Router();


router.post('/new',protectedMiddleware,create_new_order);
router.get('/all',get_all_orders);
router.get('/new',get_new_orders);
router.put('/update/:id',update_order_status);

export default router;