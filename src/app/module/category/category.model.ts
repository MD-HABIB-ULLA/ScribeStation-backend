import { model, Schema } from 'mongoose';
import { TCategory } from './category.interface';

const CategorySchema = new Schema<TCategory>(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.isDeleted;
        delete ret.isActive;
        return ret;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        delete ret.isDeleted;
        delete ret.isActive;
        return ret;
      },
    },
  },
);


export const Category = model<TCategory>('Category', CategorySchema);
