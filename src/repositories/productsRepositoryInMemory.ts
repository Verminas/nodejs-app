const products: Product[] = [{name: 'tomato', id: '1'}, {name: 'orange', id: '2'}, {name: 'apple', id: '3'}]

export const productsRepository = {
  async getProducts(params: {name: string | undefined}): Promise<Product[]>{
    const {name} = params
    if (name) {
      const filteredProducts = products.filter(pr => pr.name.startsWith(name))
      return filteredProducts
    } else {
      return products
    }
  },
  async getProductById(id: string): Promise<Nullable<Product>> {
    const product = products.find(i => i.id === id)
    if (product) {
      return product
    } else {
      return null
    }
  },
  async deleteProductById(id: string): Promise<boolean> {
    const index = products.findIndex(i => i.id === id)
    if (index > -1) {
      products.splice(index, 1);
      return true
    } else {
      return false
    }
  },
  async createProduct(params: {name: string | undefined}): Promise<Nullable<Product>> {
    const {name} = params
    if (name) {
      const newProduct = {name, id: Date.now().toString()}
      products.push(newProduct)
      return newProduct
    } else {
      return null
    }
  },
  async updateProduct(params: {name: string | undefined, id: string}): Promise<boolean> {
    const {id, name} = params
    const product = products.find(p => p.id === id)
    if (product && name) {
      product.name = name
      return true
    } else {
      return false
    }
  }
}

export type Product = {
  name: string
  id: string
}
export type Nullable<T> = null | T