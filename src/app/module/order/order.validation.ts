import { z } from 'zod';

export const OrderValidationSchema = z.object({
  body: z.object({
    user: z
      .string()
      .trim()
      .min(24, 'Invalid customer ID.') // Ensuring it's a MongoDB ObjectId
      .max(24, 'Invalid customer ID.'),
    cartItems: z.array(
      z.object({
        productId: z
        .string()
        .trim()
        .min(24, 'Invalid customer ID.') // Ensuring it's a MongoDB ObjectId
        .max(24, 'Invalid customer ID.'),
        quantity: z.number().int().positive('Quantity must be greater than 0.'),
      }),
    ),
    status: z
      .enum(['Pending', 'Paid', 'Cancelled'])
      .optional()
      .default('Pending'),
    totalPrice: z.number().positive('Total price must be greater than 0.'),
  }),
});
