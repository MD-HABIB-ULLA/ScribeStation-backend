import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();
// create a  product
router.post('/', ProductControllers.createProduct);

// get all product
router.get('/', ProductControllers.getAllProducts);

// get single product by ID
router.get('/:productId', ProductControllers.getSingleProducts);

router.put('/:productId', ProductControllers.updateProduct)


router.delete('/:productId', ProductControllers.deleteProduct)


export const ProductRoutes = router;
