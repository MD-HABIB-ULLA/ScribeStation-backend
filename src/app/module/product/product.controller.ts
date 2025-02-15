/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

//  create method
const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.createProductIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

// get all products data from the database
const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductServices.getAllProductsFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Products retrieved successfully',
    data: result,
  });
});
// get single data from database
const getSingleProducts = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;

  // Assuming some service to get the product
  const result = await ProductServices.getSingleProductsFromDB(productId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  });
});

const updateProduct = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { productId } = req.params;

    // Proceed with updating the product in the database
    const result = await ProductServices.updateProductInDB(productId, req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Product  updated successfully',
      data: result,
    });
  },
);

const deleteProduct = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { productId } = req.params;

    // Call the service to soft-delete the product
    const result = await ProductServices.deleteProductInDB(productId);

    // If the product was successfully soft-deleted
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Product deleted successfully',
      data: result,
    });
  },
);

// Helper function to format Zod errors

export const ProductControllers = {
  createProduct,
  updateProduct,
  getAllProducts,
  getSingleProducts,
  deleteProduct,
};
