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
  async createProduct(params: { name: string | undefined }): Promise<Nullable<Product>> {
    const {name} = params
    if (name) {
      const newProduct = {name, id: Date.now().toString()}
      await productsCollection.insertOne(newProduct)
      return newProduct
    } else {
      return null
    }
  },
  async updateProduct(params: { name: string | undefined, id: string }): Promise<boolean> {
    const {id, name} = params
    const result = await productsCollection.updateOne({id}, {$set: {name}})
    return result.acknowledged && !!result.matchedCount
  }
}