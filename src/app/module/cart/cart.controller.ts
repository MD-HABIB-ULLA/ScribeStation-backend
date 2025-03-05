import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import { CartServices } from './cart.service';
// import sendResponse from '../../utils/sendResponse';

const addCartItem = catchAsync(async (req: Request, res: Response) => {
  //   console.log(req.body);
  const addCartItem = await CartServices.addCartItem(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Cart added successfully',
    data: addCartItem,
  });
});

const getCartItem = catchAsync(async (req: Request, res: Response) => {
  const getCartItem = await CartServices.getCartItem(req.body.user);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Cart item fetched successfully.',
    data: getCartItem,
  });
});
const updateQuantity = catchAsync(async (req: Request, res: Response) => {
  const updatedData = await CartServices.updatedCartData(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Cart updated successfully',
    data: updatedData,
  });
});
const deleteCartItem = catchAsync(async (req: Request, res: Response) => {
  const updatedData = await CartServices.deleteCartItem(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'cart item deleted successfully',
    data: updatedData,
  });
});

export const CartController = {
  addCartItem,
  getCartItem,
  updateQuantity,
  deleteCartItem,
};
