import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const ProductSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    image: {
      type: [String],
      required: true,
      validate: {
        validator: (images: string[]) => images.length > 0, // Ensure array has at least one item
        message: 'Image array must have at least one image.',
      },
    },
    price: { type: Number, required: true, min: 0 },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String, required: true, maxlength: 500 },
    quantity: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, required: true },
    isDeleted: {
      type: Boolean,
      default: false, // Default value
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

ProductSchema.pre('findOneAndUpdate', function (next) {
  this.find({ isDeleted: { $ne: true } }).select('-isDeleted');
  next();
});

ProductSchema.pre('updateOne', function (next) {
  this.find({ isDeleted: { $ne: true } }).select('-isDeleted');
  next();
});

export const Product = model<TProduct>('Product', ProductSchema);
