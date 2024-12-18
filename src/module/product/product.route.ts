import express from 'express';
import { productControllers } from './product.controller';

const router = express.Router();
// create a  product
router.post('/', productControllers.createProduct);

// get all product
router.get('/', productControllers.getAllProducts);

// get single product by ID
router.get('/:productId', productControllers.getSingleProducts);

router.put('/:productId', productControllers.updateProduct)


router.delete('/:productId', productControllers.deleteProduct)


export const productRoutes = router;
