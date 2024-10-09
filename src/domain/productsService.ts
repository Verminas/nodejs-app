import {Nullable, Product} from "../types/products";
import {productsRepository} from "../repositories/productsRepositoryDB";


export const productsService = {
  async getProducts(params: { name: string | undefined }): Promise<Product[]> {
    return productsRepository.getProducts(params)
  },
  async getProductById(id: string): Promise<Nullable<Product>> {
    return productsRepository.getProductById(id)
  },
  async deleteProductById(id: string): Promise<boolean> {
    return productsRepository.deleteProductById(id)
  },
  async createProduct(params: { name: string | undefined }): Promise<Nullable<Product>> {
    const {name} = params
    if (name) {
      const newProduct:Product = {name, id: Date.now().toString()}
      await productsRepository.createProduct(newProduct)
      return newProduct
    } else {
      return null
    }
  },
  async updateProduct(params: { name: string | undefined, id: string }): Promise<boolean> {
    return productsRepository.updateProduct(params)
  }
}