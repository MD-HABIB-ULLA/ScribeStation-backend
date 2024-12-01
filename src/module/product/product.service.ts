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
  const product = await Product.findOne({_id : id});
  return product;
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductsFromDB,
};
