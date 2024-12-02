import { Request, Response } from 'express';
import { orderValidationSchema } from './order.validation';
import { createOrderInDB } from './order.service';
import { z } from 'zod';

const createOrder = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = orderValidationSchema.parse(req.body);

    // Create order
    const order = await createOrderInDB(validatedData);

    res
      .status(201)
      .json({ success: true, message: 'Order created successfully.', order });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
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

export const orderController = {
  createOrder,
};
