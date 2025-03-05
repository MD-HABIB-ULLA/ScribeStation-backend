import { Types } from 'mongoose';
import { Product } from '../module/product/product.model';

/**
 * Helper function to calculate the total price of product items
 * @param productItems Array of objects containing product ID and quantity
 * @returns The calculated total price
 */
export const calculateTotalPrice = async (
  productItems: Array<{ product: string | Types.ObjectId, quantity: number }>
): Promise<number> => {
  // Validate input
  if (!Array.isArray(productItems) || productItems.length === 0) {
    throw new Error('Product items must be a non-empty array');
  }

  let totalPrice = 0;

  // Process each product item
  const pricePromises = productItems.map(async (item) => {
    // Convert product ID to ObjectId if it's a string
    const productId = typeof item.product === 'string' 
      ? new Types.ObjectId(item.product) 
      : item.product;

    // Validate quantity
    if (typeof item.quantity !== 'number' || item.quantity <= 0) {
      throw new Error('Each product item must have a positive quantity');
    }

    // Fetch product price from database
    const product = await Product.findById(productId);
    
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    // Assuming product has a price field
    if (typeof product.price !== 'number') {
      throw new Error(`Product with ID ${productId} has an invalid price`);
    }

    // Calculate price for this item and add to total
    return product.price * item.quantity;
  });

  // Wait for all price calculations and sum them up
  const prices = await Promise.all(pricePromises);
  totalPrice = prices.reduce((sum, price) => sum + price, 0);

  // You might want to round to 2 decimal places for currency
  return Math.round(totalPrice * 100) / 100;
};
