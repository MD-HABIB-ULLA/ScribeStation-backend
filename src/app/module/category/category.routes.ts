import express from 'express';
import { CategoryController } from './category.controller';
import validationRequest from '../../middlewares/validationRequest';
import {
  CategoryValidationSchema,
  UpdateCategoryValidationSchema,
} from './category.validatoin';
import roleMiddleware from '../../middlewares/roleMiddleware';
const router = express.Router();

router.post(
  '/',
  roleMiddleware('admin'),
  validationRequest(CategoryValidationSchema),
  CategoryController.createCategory,
);
router.get('/', roleMiddleware('admin'), CategoryController.getAllCategories);
router.patch(
  '/:id',
  roleMiddleware('admin'),
  validationRequest(UpdateCategoryValidationSchema),
  CategoryController.updateCategory,
);
router.delete(
  '/:id',
  roleMiddleware('admin'),
  CategoryController.deleteSingleCategories,
);

export const CategoryRoutes = router;
