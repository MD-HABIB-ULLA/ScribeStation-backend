import { Types } from "mongoose";

export interface TProduct {
  name: string;
  brand: string;
  image:string[]
  price: number;
  category: Types.ObjectId;
  description: string;
  quantity: number;
  inStock?: boolean;
  isDeleted?: boolean; // Optional field
}
