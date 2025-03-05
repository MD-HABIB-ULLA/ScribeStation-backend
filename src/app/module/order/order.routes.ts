import express from 'express';
import { orderController } from './order.controller';
import validationRequest from '../../middlewares/validationRequest';
import { OrderValidationSchema } from './order.validation';
const router = express.Router();
// create a  product
router.post(
  '/',
  validationRequest(OrderValidationSchema),
  orderController.createOrder,
);
router.post('/order-success', orderController.orderSuccess);
router.get('/', orderController.allOrders);
router.get('/revenue', orderController.totalRevenue);

export const OrderRoutes = router;
