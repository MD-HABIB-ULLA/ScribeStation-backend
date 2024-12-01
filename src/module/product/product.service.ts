import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB =  async (productData: TProduct)=>{
    const product =  new Product(productData)

    const result = await Product.create(product)
    return result
}


export const productServices ={
     createProductIntoDB
}