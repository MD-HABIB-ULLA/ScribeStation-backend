import express from 'express';
import { CartController } from './cart.controller';
import authMiddleware from '../../middlewares/authMiddleware';
import validationRequest from '../../middlewares/validationRequest';
import {
  CartItemValidationSchema,
  DeleteCartItemValidationSchema,
} from './cart.validation';
const router = express.Router();

router.post(
  '/',
  authMiddleware,
  validationRequest(CartItemValidationSchema),
  CartController.addCartItem,
);
router.delete(
  '/',
  authMiddleware,
  validationRequest(DeleteCartItemValidationSchema),
  CartController.deleteCartItem,
);
router.get('/', authMiddleware, CartController.getCartItem);
router.patch(
  '/',
  authMiddleware,
  validationRequest(CartItemValidationSchema),
  CartController.updateQuantity,
);
export const CartRoutes = router;
