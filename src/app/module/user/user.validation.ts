import { z } from 'zod';

export const UserValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Name is required'),
    image: z.string().trim().min(1, 'Image is required'),
    email: z.string().trim().email('Invalid email address.'),
    password: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters long'),
    role: z.enum(['customer', 'admin']).optional(),
    isActive: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  }),
});
