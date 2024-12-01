/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ProductValidationSchema } from './product.validation';
import { productServices } from './product.service';
import { z } from 'zod';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body.product;
    console.log(req.body);

    // Validate the product data using Zod
    const zodData = ProductValidationSchema.parse(product);

    // If validation passes, save the product into DB
    await productServices.createProductIntoDB(zodData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: zodData, // Send validated product data
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: {
          name: 'ValidationError',
          errors: formatZodError(error),
        },
        stack: error.stack
      });
    } else {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.';
      res.status(500).json({
        success: false,
        message: errorMessage,
        error: {
          name: 'UnexpectedError',
          errors: { message: errorMessage }
        },
        // eslint-disable-next-line no-undefined
        stack: error instanceof Error ? error.stack : undefined
      });
    }
  }
};

// Helper function to format Zod errors
const formatZodError = (error: z.ZodError) => {
  const formattedErrors: Record<string, any> = {};
  error.errors.forEach((err) => {
    const path = err.path.join('.');
    formattedErrors[path] = {
      message: err.message,
      name: 'ValidatorError',
      properties: {
        message: err.message,
        type: err.code,
        path: path,
      },
      kind: err.code,
      path: path,
    
    };
  });
  return formattedErrors;
};

export const productControllers = {
  createProduct,
};

