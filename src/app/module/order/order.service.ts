import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderInDB = async (orderData: TOrder) => {
  // Fetch the product to check stock
  const product = await Product.findById(orderData.product);

  if (!product) {
    throw new Error('Product not found.');
  }

  if (product.quantity < orderData.quantity) {
    throw new Error('Insufficient product stock.');
  }

  // Update product stock
  product.quantity -= orderData.quantity;
  await product.save();

  // Create the order
  const order = new Order(orderData);
  await order.save();

  return order;
};

const calculateTotalRevenue = async () => {
  return await Order.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
  ]);
};

const getAllOrders = async () => {
  return await Order.find();
};
export const orderService = {
  createOrderInDB,
  calculateTotalRevenue,
  getAllOrders,
};
