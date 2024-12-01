import { Request, Response } from 'express';
import { ProductValidationSchema } from './product.validation';
import { productServices } from './product.service';
import { z } from 'zod';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body.product;
    const zodData = ProductValidationSchema.parse(product);
    await productServices.createProductIntoDB(zodData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    } else {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.';
      res.status(500).json({
        success: false,
        message: errorMessage,
      });
    }
  }
};



export const productControllers = {
 createProduct
}