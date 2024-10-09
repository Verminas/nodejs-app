import {Nullable, Product} from "../types/products";
import {productsCollection} from "../database/db";


export const productsRepository = {
  async getProducts(params: { name: string | undefined }): Promise<Product[]> {
    const {name} = params
    const filter = name ? {name: {$regex: name}} : {}
    return productsCollection.find(filter).toArray()
  },
  async getProductById(id: string): Promise<Nullable<Product>> {
    return productsCollection.findOne({id})
  },
  async deleteProductById(id: string): Promise<boolean> {
    const result = await productsCollection.deleteOne({id})
    return result.acknowledged && result.deletedCount === 1;
  },
  async createProduct(product: Product):Promise<Product> {
      await productsCollection.insertOne(product)
      return product
  },
  async updateProduct(params: { name: string | undefined, id: string }): Promise<boolean> {
    const {id, name} = params
    const result = await productsCollection.updateOne({id}, {$set: {name}})
    return result.acknowledged && !!result.matchedCount
  }
}