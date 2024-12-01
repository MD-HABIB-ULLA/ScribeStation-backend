import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const ProductSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    description: { type: String, required: true, maxlength: 500 },
    quantity: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, required: true },
    isDeleted: {
      type: String,
      enum: ['true', 'false', 'archived'],
      default: 'false', // Default value
    },
  },
  { timestamps: true },
);

ProductSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } }).select('-isDeleted');
  next();
});
ProductSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } }).select('-isDeleted');
  next();
});


export const Product = model<TProduct>('Product', ProductSchema);
