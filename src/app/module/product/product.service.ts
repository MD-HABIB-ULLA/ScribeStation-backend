import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { productSearchableFields } from './productConstant';

const createProductIntoDB = async (productData: TProduct) => {
  const product = new Product(productData);
  const result = await Product.create(product);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  console.log(query);

  const productQuery = new QueryBuilder(Product.find(), query)
    .search(productSearchableFields)
    .filter()
    .sort();
  const product = await productQuery.modelQuery;
  return product;
};
const getSingleProductsFromDB = async (id: string) => {
  const product = await Product.findById({ _id: id });
  return product;
};

// const updateProductInDB = async (id: string, updateData: Partial<TProduct>) => {
//   const updatedProduct = await Product.updateOne({_id : id}, {updateData} );
//   return updatedProduct;
// };

const updateProductInDB = async (id: string, updateData: Partial<TProduct>) => {
  // ✅ Step 2: Attempt to update product
  const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
    new: true, // Return updated document
    runValidators: true, // Ensure schema validation
  });

  // ✅ Step 3: Handle case where product does not exist
  if (!updatedProduct) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  return updatedProduct;
};

const deleteProductInDB = async (id: string) => {
  // Check if the product exists
  const isExist = await Product.findOne({ _id: id });

  if (!isExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  // Update the product to mark it as deleted
  const result = await Product.updateOne({ _id: id }, { isDeleted: true });
  return result;

  // If the product doesn't exist, return null
  return null;
};

// const deleteProductInDB = async (id: string, ) => {
//   const updatedProduct = await Product.updateOne(id, updateData, {
//     new: true, // Return the updated document
//     runValidators: true, // Ensure the update follows schema validation
//   });
//   return updatedProduct;
// };

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  deleteProductInDB,
  getSingleProductsFromDB,
  updateProductInDB,
};
