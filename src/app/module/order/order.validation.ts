import { z } from "zod";

export const orderValidationSchema = z.object({
  email: z
    .string()
    .trim() // Trims whitespace from both sides
    .email("Invalid email address."),
  product: z
    .string()
    .trim() // Trims whitespace from both sides
    .min(24, "Invalid product ID."),
  quantity: z
    .number()
    .int()
    .positive("Quantity must be greater than 0."),
  totalPrice: z
    .number()
    .positive("Total price must be greater than 0."),
});
