import { Types } from 'mongoose';

export interface TCart {
  user: Types.ObjectId;
  items?: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
}

export interface TCartItem {
  product: Types.ObjectId;
  quantity: number;
  user: Types.ObjectId;
}
export interface TDeleteCartItem {
  product: Types.ObjectId;
  user: Types.ObjectId;
}

