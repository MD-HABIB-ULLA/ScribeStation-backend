import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { CategoryServices } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.createCategoryIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.updateCategoryIntoDB(
    req.params.id,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Category updated successfully',
    data: result,
  });
});
const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.getAllCategories();
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Categories arived successfully',
    data: result,
  });
});
const getSingleCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryServices.getSingleCategory(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Category arived successfully',
    data: result,
  });
});
const deleteSingleCategories = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryServices.deleteSingleCategory(req.params.id);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: 'Category deleted   successfully',
      data: result,
    });
  },
);

export const CategoryController = {
  createCategory,
  updateCategory,
  getAllCategories,
  getSingleCategories,
  deleteSingleCategories,
};
