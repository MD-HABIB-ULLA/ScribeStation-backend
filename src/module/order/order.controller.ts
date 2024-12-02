import { Request, Response } from 'express';
import { orderValidationSchema } from './order.validation';
import { orderService } from './order.service';
import { z } from 'zod';

const createOrder = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = orderValidationSchema.parse(req.body);

    // Create order
    const order = await orderService.createOrderInDB(validatedData);

    res
      .status(201)
      .json({ success: true, message: 'Order created successfully.', order });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        status: false,
        message: 'Validation error.',
        errors: error.errors.map((err) => err.message),
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

const totalRevenue = async (req: Request, res: Response) => {
  try {
    // Call the service to calculate total revenue
    const result = await orderService.calculateTotalRevenue();

    // Extract the total revenue from the result
    const totalRevenue = result[0]?.totalRevenue || 0;

    // Send the success response
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue,
      },
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: 'An error occurred while calculating revenue',
      status: false,
      error: error,
    });
  }
};

const allOrders = async (req: Request, res:Response) => {

  try {
    // Call the service to get all orders
    const orders = await orderService.getAllOrders();

    // Send the success response
    res.status(200).json({
      message: "Orders fetched successfully",
      status: true,
      data: orders, // Return all orders
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: "An error occurred while fetching orders",
      status: false,
      error: error,
    });
  }
}

export const orderController = {
  createOrder,
  totalRevenue,
  allOrders
};
