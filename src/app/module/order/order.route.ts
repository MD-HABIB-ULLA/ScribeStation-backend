import express from 'express';
import { orderController } from './order.controller';
const router = express.Router();
// create a  product
router.post('/', orderController.createOrder);
router.get('/', orderController.allOrders);
router.get('/revenue', orderController.totalRevenue);




export const orderRoutes = router;
