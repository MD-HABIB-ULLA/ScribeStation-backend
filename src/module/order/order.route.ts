import express from 'express';
import { orderController } from './order.controller';
const router = express.Router();
// create a  product
router.post('/', orderController.createOrder);




export const orderRoutes = router;
