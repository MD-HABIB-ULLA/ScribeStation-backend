import { Types } from "mongoose";

export interface TOrder {
  totalPrice: number;
  cartItems: CartItem[];
  user: Types.ObjectId; 
  status?: "Pending" | "Paid" | "Cancelled";  // Optional status field

}

export interface CartItem {
  productId: Types.ObjectId;  // Reference to Product collection
  quantity: number;
}
