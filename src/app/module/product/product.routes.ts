import express from 'express';
import { ProductControllers } from './product.controller';
import validationRequest from '../../middlewares/validationRequest';
import {
  ProductValidationSchema,
  UpdateProductValidationSchema,
} from './product.validation';
import roleMiddleware from '../../middlewares/roleMiddleware';

const router = express.Router();
// create a  product
router.post(
  '/',
  roleMiddleware('admin'),
  validationRequest(ProductValidationSchema),
  ProductControllers.createProduct,
);

// get all product
router.get('/', ProductControllers.getAllProducts);

// get single product by ID
router.get('/:productId', ProductControllers.getSingleProducts);

router.put(
  '/:productId',
  roleMiddleware('admin'),

  validationRequest(UpdateProductValidationSchema),
  ProductControllers.updateProduct,
);

router.delete(
  '/:productId',
  roleMiddleware('admin'),
  ProductControllers.deleteProduct,
);

export const ProductRoutes = router;
