/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ProductValidationSchema } from './product.validation';
import { productServices } from './product.service';
import { z } from 'zod';

// error format
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

//  create method
const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body.product;

    // Validate the product data using Zod
    const zodData = ProductValidationSchema.parse(product);

    // If validation passes, save the product into DB
    const result = await productServices.createProductIntoDB(zodData);

    res.status(201).json({
      status: true,
      message: 'Product created successfully',
      product: result, // Send validated product data
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        status: false,
        message: 'Validation failed',
        error: {
          name: 'ValidationError',
          errors: formatZodError(error),
        },
        stack: error.stack,
      });
    } else {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.';
      res.status(500).json({
        status: false,
        message: errorMessage,
        error: {
          name: 'UnexpectedError',
          errors: { message: errorMessage },
        },
        // eslint-disable-next-line no-undefined
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
  }
};
// get all products data from the database
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productServices.getAllProductsFromDB();
    res.status(200).json({
      status: true,
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'An unexpected error occurred',
      error: {
        name: 'UnexpectedError',
        errors: error,
      },
      // eslint-disable-next-line no-undefined
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
};
// get single data from database
const getSingleProducts = async (
  req: Request,
  res: Response,
) => {
  try {
    const { productId } = req.params;

    // Assuming some service to get the product
    const product = await productServices.getSingleProductsFromDB(productId);

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
        error: `No product found with id: ${productId}`,
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: 'Product fetched successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    // Validate the update data using Zod
    const zodData = ProductValidationSchema.partial().parse(updateData);

    // Proceed with updating the product in the database
    const updatedProduct = await productServices.updateProductInDB(
      productId,
      zodData,
    );

    if (!updatedProduct) {
      res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({
      status: true,
      message: 'Product data updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      console.error(error);
      res.status(400).json({
        status: false,
        message: 'Validation failed',
        error: {
          name: 'ValidationError',
          errors: formatZodError(error),
        },
        stack: error.stack,
      });
    } else {
      res.status(500).json({
        status: false,
        message: 'Something went wrong',
        error: error instanceof Error ? error.message : error,
        // eslint-disable-next-line no-undefined
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;

    // Call the service to soft-delete the product
    const result = await productServices.deleteProductInDB(productId);

    if (result === null) {
      res.status(404).json({
        status: false,
        message: 'This product is already deleted',
      });
      return;
    }
    // Check if the product was actually updated (soft-deleted)
    if (!productServices) {
      res.status(404).json({
        status: false,
        message: 'Product not found',
        error: `No product found with id: ${productId}`,
      });
      return;
    }

    // If the product was successfully soft-deleted
    res.status(200).json({
      status: true,
      message: 'Product deleted successfully',
      data: [],
    });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({
      status: false,
      message: 'An unexpected error occurred',
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Helper function to format Zod errors

export const productControllers = {
  createProduct,
  updateProduct,
  getAllProducts,
  getSingleProducts,
  deleteProduct,
};
