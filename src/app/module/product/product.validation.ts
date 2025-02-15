import { z } from 'zod';

export const ProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim() // Trim whitespace
      .min(1, 'Name is required'),
    brand: z
      .string()
      .trim() // Trim whitespace
      .min(1, 'Brand is required'),
    price: z.number().min(0, 'Price must be a non-negative number'),
    category: z
      .string()
      .trim() // Trim whitespace
      .min(1, 'Category is required'),
    description: z
      .string()
      .trim() // Trim whitespace
      .max(500, 'Description cannot exceed 500 characters'),
    quantity: z
      .number()
      .int()
      .min(0, 'Quantity must be a non-negative integer'),
    inStock: z.boolean(),
    isDeleted: z.boolean().optional(), // Optional field
  }),
});
export const UpdateProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim() // Trim whitespace
      .min(1, 'Name is required')
      .optional(),
    brand: z
      .string()
      .trim() // Trim whitespace
      .min(1, 'Brand is required')
      .optional(),
    price: z.number().min(0, 'Price must be a non-negative number').optional(),
    category: z
      .string()
      .trim() // Trim whitespace
      .min(1, 'Category is required')
      .optional(),
    description: z
      .string()
      .trim() // Trim whitespace
      .max(500, 'Description cannot exceed 500 characters')
      .optional(),
    quantity: z
      .number()
      .int()
      .min(0, 'Quantity must be a non-negative integer')
      .optional(),
    inStock: z.boolean().optional(),
    isDeleted: z.boolean().optional(), 
  }),
});
