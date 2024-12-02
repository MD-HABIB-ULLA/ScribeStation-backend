import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  const product = new Product(productData);

  const result = await Product.create(product);
  return result;
};

const getAllProductsFromDB = async () => {
  const product = await Product.find();
  return product;
};
const getSingleProductsFromDB = async (id: string) => {
  const product = await Product.findOne({ _id: id });
  return product;
};

// const updateProductInDB = async (id: string, updateData: Partial<TProduct>) => {
//   const updatedProduct = await Product.updateOne({_id : id}, {updateData} );
//   return updatedProduct;
// };
const updateProductInDB = async (id: string, updateData: Partial<TProduct>) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
    new: true, // Return the updated document
    runValidators: true, // Ensure the update follows schema validation
  });
  return updatedProduct;
};

const deleteProductInDB = async (id: string) => {
  // Check if the product exists
  const isExist = await Product.findOne({ _id: id });

  if (isExist !== null) {
    // Update the product to mark it as deleted
    const result = await Product.updateOne({ _id: id }, { isDeleted: true });
    return result;
  }

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

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  deleteProductInDB,
  getSingleProductsFromDB,
  updateProductInDB,
};
