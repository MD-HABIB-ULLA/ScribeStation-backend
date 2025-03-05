import express from 'express';
import { ProductControllers } from './product.controller';
import validationRequest from '../../middlewares/validationRequest';
import {
  ProductValidationSchema,
  UpdateProductValidationSchema,
} from './product.validation';

const router = express.Router();
// create a  product
router.post(
  '/',
  validationRequest(ProductValidationSchema),
  ProductControllers.createProduct,
);

// get all product
router.get('/', ProductControllers.getAllProducts);

// get single product by ID
router.get('/:productId', ProductControllers.getSingleProducts);

router.put(
  '/:productId',
  validationRequest(UpdateProductValidationSchema),
  ProductControllers.updateProduct,
);

router.delete('/:productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
