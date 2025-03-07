import { TCategory, TUpdateInterface } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};

const updateCategoryIntoDB = async (
  categoryId: string,
  payload: TUpdateInterface,
) => {
  const categoryData = await Category.findById(categoryId);
  if (!categoryData) {
    throw new Error('Category not found');
  }

  // Check if the new name is unique (if provided)
  if (payload.name) {
    const existingCategory = await Category.findOne({ name: payload.name });
    if (existingCategory && existingCategory._id.toString() !== categoryId) {
      throw new Error('Category name must be unique');
    }
  }

  // Update the category with only allowed fields
  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    {
      $set: {
        ...(payload.image && { image: payload.image }),
        ...(payload.icon && { icon: payload.icon }),
        ...(payload.description && { description: payload.description }),
        ...(payload.name && { name: payload.name }),
      },
    },
    { new: true, runValidators: true },
  ).select('-isDeleted -isActive'); // Exclude isDeleted and isActive from response

  return updatedCategory;
};

const getAllCategories = async () => {
  const categories = await Category.find({ isDeleted: false }).select(
    '-isDeleted -isActive',
  );
  return categories;
};
const getSingleCategory = async (categoryId: string) => {
  const category = await Category.find({
    isDeleted: false,
    _id: categoryId,
  }).select('-isDeleted -isActive');
  return category;
};
const deleteSingleCategory = async (categoryId: string) => {
  const categoryData = await Category.findById(categoryId);
  if (!categoryData) {
    throw new Error('Category not found');
  }
  if (categoryData?.isDeleted) {
    throw new Error('Category is already deleted'); // Avoid deleting a deleted category again.
  }

  const result = await Category.findByIdAndUpdate(categoryId, {
    isDeleted: true,
  });
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  updateCategoryIntoDB,
  getAllCategories,
  getSingleCategory,
  deleteSingleCategory,
};
