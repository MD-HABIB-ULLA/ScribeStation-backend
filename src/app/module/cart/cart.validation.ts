import { z } from 'zod';

export const CartItemValidationSchema = z.object({
  body: z.object({
    product: z.string().min(1, 'product id is required'),
    user: z.string().min(1, 'user id is required'),
    quantity: z.number().min(1, 'quantity id is required'),
  }),
});
export const DeleteCartItemValidationSchema = z.object({
  body: z.object({
    product: z.string().min(1, 'product id is required'),
    user: z.string().min(1, 'user id is required'),
  }),
});
