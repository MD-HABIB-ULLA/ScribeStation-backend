import express from 'express';
import { productControllers } from './product.controller';

const router = express.Router();

// router.get('/', (req, res) => {});
router.post('/create-product', productControllers.createProduct);
// router.get('/:id', (req, res) => {});

export const productRoutes = router;
