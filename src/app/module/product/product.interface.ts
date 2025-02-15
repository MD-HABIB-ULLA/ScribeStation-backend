export interface TProduct {
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted?: boolean; // Optional field
}
