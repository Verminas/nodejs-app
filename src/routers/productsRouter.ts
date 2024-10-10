import { Request, Response, Router} from "express";
import {errorsValidate, titleValidator} from "../middlewars/input-validators";
import {authValidator} from "../middlewars/auth-validators";
import {Product, Nullable} from "../types/products";
import {productsService} from "../domain/productsService";

export const productsRouter = Router()

productsRouter.get('/', async (req: Request, res: Response) => {
  console.log(req.body)
  const products: Product[] = await  productsService.getProducts({name: req.query.name?.toString()})
  res.status(200).send(products)
})

productsRouter.get('/:id', async (req: Request, res: Response) => {
  const product: Nullable<Product> = await productsService.getProductById(req.params.id)
  if (product) {
    res.status(200).send(product)
  } else {
    res.send(404)
  }
})

productsRouter.delete('/:id', authValidator, async (req: Request, res: Response) => {
  const isDeleted: boolean = await productsService.deleteProductById(req.params.id)
  if (isDeleted) {
    res.send(204)
  } else {
    res.send(404)
  }
})

productsRouter.post('/' , authValidator, titleValidator, errorsValidate, async (req: Request, res: Response) => {
  const product: Nullable<Product> = await productsService.createProduct({name: req.body.name})
  if (product) {
    res.status(201).send(product)
  } else {
    res.send(400)
  }
})

productsRouter.put('/:id', authValidator, titleValidator, errorsValidate, async (req: Request, res: Response) => {
  const isUpdated: boolean = await productsService.updateProduct({id: req.params.id, name: req.body.name })
  if(isUpdated) {
    const product: Nullable<Product> = await productsService.getProductById(req.params.id)
    res.status(200).send(product)
  } else {
    res.send(400)
  }
})