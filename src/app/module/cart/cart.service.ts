/* eslint-disable @typescript-eslint/no-explicit-any */
import { calculateTotalPrice } from '../../helper/calculateTotalPrice';
import { TCartItem, TDeleteCartItem } from './cart.interface';
import { Cart } from './cart.model';

const addCartItem = async (cartData: TCartItem) => {
  try {
    // Fetch the user's cart data
    let userCartData = await Cart.findOne({
      user: cartData.user,
    });

    // If the cart doesn't exist, create a new one
    if (!userCartData) {
      userCartData = new Cart({
        user: cartData.user,
        items: [{ product: cartData.product, quantity: cartData.quantity }],
        totalPrice: await calculateTotalPrice([
          { product: cartData.product, quantity: cartData.quantity },
        ]),
      });
      await userCartData.save();
      return [];
    }

    // Initialize items array if it doesn't exist
    if (!userCartData.items) {
      userCartData.items = [];
    }

    // Check if the item already exists in the cart
    const existingItem = userCartData.items.find(
      (item) => item.product.toString() === cartData.product.toString(),
    );

    if (existingItem) {
      throw new Error('Item already exists in the cart');
    } else {
      // Add new item to the cart
      userCartData.items.push({
        product: cartData.product,
        quantity: cartData.quantity,
      });
    }

    // Recalculate the total price after updating the items
    userCartData.totalPrice = await calculateTotalPrice(userCartData.items);

    // Save the updated cart
    const updatedCart = await userCartData.save();
    return updatedCart; // Return the updated cart data
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error; // Re-throw the error to be handled by higher-level code
  }
};
const getCartItem = async (userId: string) => {
  const userCartData = await Cart.findOne({ user: userId }).populate(
    'items.product',
  );

  if (!userCartData) {
    throw new Error('Cart not found');
  }

  return userCartData;
};

const deleteCartItem = async (cartData: TDeleteCartItem) => {
  try {
    // Fetch the user's cart data
    const userCartData = await Cart.findOne({
      user: cartData.user,
    });

    if (!userCartData) {
      throw new Error('Cart not found');
    }

    userCartData.items =
      userCartData.items?.filter(
        (item) => item.product.toString() !== cartData.product.toString(),
      ) || [];

    userCartData.totalPrice = await calculateTotalPrice(userCartData.items);

    // Add await here to ensure the save completes before returning
    await userCartData.save();

    return []; // Return the updated cart data
  } catch (error) {
    // Optionally log the original error for debugging
    console.error('Error in deleteCartItem:', error);
    throw new Error('Error deleting cart item');
  }
};
const updatedCartData = async (cartData: TCartItem) => {
  try {
    const userCartData = await Cart.findOne({ user: cartData.user });

    if (!userCartData) {
      throw new Error('Cart not found');
    }

    // Find the item in the cart
    const cartItem = userCartData.items?.find((item) =>
      item.product.equals(cartData.product),
    );

    if (!cartItem) {
      throw new Error('Product not found in cart');
    }

    cartItem.quantity = cartData.quantity;

    // Recalculate total price
    userCartData.totalPrice = await calculateTotalPrice(
      userCartData.items || [],
    );

    // Save the updated cart
    await userCartData.save(); // Ensure the save operation is awaited

    return []; // Return the updated cart data
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw new Error('Error updating cart item');
  }
};

export const CartServices = {
  addCartItem,
  getCartItem,
  deleteCartItem,
  updatedCartData,
};
