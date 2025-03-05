import { Request, Response } from 'express';
import { orderService } from './order.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  // Create order
  const result = await orderService.createOrderInDB(req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Order created successfully.',
      data: result,
    });
});
const orderSuccess = catchAsync(async (req: Request, res: Response) => {
  console.log("Body:", req);
  console.log("Query:", req.query);
  
  const transactionId = req.body.tran_id || req.query.tran_id;
  console.log("Transaction ID:", transactionId);

 
  await orderService.paymentSuccess(req.body, res);
});


const totalRevenue = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.calculateTotalRevenue();

  // Extract the total revenue from the result
  const totalRevenue = result[0]?.totalRevenue || 0;

  // Send the success response
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Revenue calculated successfully',
    data: totalRevenue,
  });
});

const allOrders = catchAsync(async (req: Request, res: Response) => {
  // Call the service to get all orders
  const result = await orderService.getAllOrders();

  // Send the success response
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Revenue calculated successfully',
    data: result,
  });
});

export const orderController = {
  createOrder,
  totalRevenue,
  allOrders,
  orderSuccess
};
