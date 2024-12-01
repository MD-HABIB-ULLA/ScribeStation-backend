import express from 'express';
import { productControllers } from './product.controller';

const router = express.Router();
// create a  product
router.post('/create-product', productControllers.createProduct);

// get all product
router.get('/', productControllers.getAllProducts);
router.get('/:id', productControllers.getSingleProducts);

export const productRoutes = router;
