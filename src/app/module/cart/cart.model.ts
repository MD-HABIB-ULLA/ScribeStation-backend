import { model, Schema } from 'mongoose';
import { TCart } from './cart.interface';

const CartSchema = new Schema<TCart>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: {
      type: [
        {
          product: { type: Schema.Types.ObjectId, ref: 'Product' },
          quantity: { type: Number, required: true },
        },
      ],
      default: [],
    },
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Cart = model<TCart>('Cart', CartSchema);
