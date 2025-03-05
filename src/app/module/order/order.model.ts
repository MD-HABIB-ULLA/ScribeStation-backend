import { Schema, model } from "mongoose";
import { TOrder, CartItem } from "./order.interface";

// Define the CartItem schema
const CartItemSchema = new Schema<CartItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
});

// Define the Order schema
const OrderSchema = new Schema<TOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: [true, "Customer ID is required"],
    },
    cartItems: {
      type: [CartItemSchema], // An array of CartItem objects
      required: true,
    },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Order = model<TOrder>("Order", OrderSchema);
