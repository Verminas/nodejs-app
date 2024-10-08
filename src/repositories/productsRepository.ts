const products = [{title: 'tomato', id: 1}, {title: 'orange', id: 2}, {title: 'apple', id: 3}]

export const productsRepository = {
  getProducts(params: {title: string | undefined}){
    const {title} = params
    if (title) {
      const filteredProducts = products.filter(pr => pr.title.startsWith(title))
      return filteredProducts
    } else {
      return products
    }
  },
  getProductById(id: number) {
    const product = products.find(i => i.id === id)
    if (product) {
      return product
    } else {
      return null
    }
  },
  deleteProductById(id: number) {
    const index = products.findIndex(i => i.id === id)
    if (index > -1) {
      products.splice(index, 1);
      return true
    } else {
      return false
    }
  },
  createProduct(params: {title: string | undefined}) {
    const {title} = params
    if (title) {
      const newProduct = {title, id: Date.now()}
      products.push(newProduct)
      return newProduct
    } else {
      return null
    }
  },
  updateProduct(params: {title: string | undefined, id: number}) {
    const {id, title} = params
    const product = products.find(p => p.id === id)
    if (product && title) {
      product.title = title
      return true
    } else {
      return false
    }
  }
}