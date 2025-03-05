/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from '../product/product.model';
import axios from 'axios';
import qs from 'qs';
import { Order } from './order.model';
import config from '../../config';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { TOrder } from './order.interface';
import { startSession } from 'mongoose';
import { Response } from 'express';
// Import Order model

export const createOrderInDB = async (orderData: TOrder) => {
  const session = await startSession();
  session.startTransaction();
  
  try {
    const { user, cartItems, totalPrice } = orderData;

    // Validate stock before proceeding and track products
    const productIds = cartItems.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } }).session(
      session,
    );

    if (products.length !== cartItems.length) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        'One or more products not found.',
      );
    }

    // Update product stock and calculate total price
    let updatedTotalPrice = 0;
    for (const cartItem of cartItems) {
      const product = products.find((p) => p._id.equals(cartItem.productId));

      if (!product || product.quantity < cartItem.quantity) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          `Insufficient stock for product: ${product?.name || cartItem.productId}`,
        );
      }

      product.quantity -= cartItem.quantity;
      await product.save({ session });

      updatedTotalPrice += cartItem.quantity * product.price;
    }

    // Create order with "Pending" status
    const order = new Order({
      user,
      cartItems,
      totalPrice: updatedTotalPrice,
      status: 'Pending',
    });

    await order.save({ session });
    

    // SSLCommerz Payment Initiation
    const paymentData = {
      store_id: config.sslcommerz_store_id,
      store_passwd: config.sslcommerz_store_password,
      total_amount: updatedTotalPrice,
      currency: 'BDT',
      tran_id: order._id.toString(), // Use Order ID as transaction ID
      success_url: `http://localhost:3000/api/orders/order-success`,
      fail_url: `https://yourdomain.com/api/payment/fail`,
      cancel_url: `https://yourdomain.com/api/payment/cancel`,
      cus_name: user,
      cus_email: 'customer@example.com', // Replace with actual email
      cus_phone: '017XXXXXXXX', // Replace with actual phone
      cus_add1: 'n/a',
      cus_city: 'n/a',
      cus_country: 'n/a',
      shipping_method: 'NO',
      product_name: 'E-commerce Order',
      product_category: 'General',
      product_profile: 'general',
    };

    const response = await axios.post(
      'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
      qs.stringify(paymentData), // Convert to x-www-form-urlencoded
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    console.log('SSLCommerz Response:', response.data);
    // Check response
    if (response.data.status === 'SUCCESS') {
      await session.commitTransaction();
      return response.data.GatewayPageURL; // Redirect to the payment gateway
    } else {
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Payment initiation failed',
      );
    }
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Server error');
  } finally {
    // Ensure session ends regardless of success or failure
    session.endSession();
  }
};

const calculateTotalRevenue = async () => {
  return await Order.aggregate([
    { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
  ]);
};

const getAllOrders = async () => {
  return await Order.find();
};

const paymentSuccess = async (successData: any, res: Response) => {
  const { tran_id, status } = successData;
  console.log(successData)

  if (status === 'VALID') {
    // Update order status to "Paid"
    const response =await Order.findByIdAndUpdate(tran_id, { status: 'Paid' });
    console.log(response);
    res.redirect('http://localhost:5173/order-success'); // Redirect to frontend
  } else {
    res.redirect('http://localhost:5173/payment-failed'); // Redirect on failure
  }
};
export const orderService = {
  createOrderInDB,
  calculateTotalRevenue,
  paymentSuccess,
  getAllOrders,
};
