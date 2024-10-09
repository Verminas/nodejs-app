import { Request, Response, Router} from "express";
import {Nullable, Product, productsRepository} from "../repositories/productsRepository";
import {errorsValidate, titleValidator} from "../middlewars/input-validators";
import {authValidator} from "../middlewars/auth-validators";

export const productsRouter = Router()

productsRouter.get('/', async (req: Request, res: Response) => {
  const products: Product[] = await  productsRepository.getProducts({name: req.query.name?.toString()})
  res.send(products)
})

productsRouter.get('/:id', async (req: Request, res: Response) => {
  const product: Nullable<Product> = await productsRepository.getProductById(req.params.id)
  if (product) {
    res.status(200).send(product)
  } else {
    res.send(404)
  }
})

productsRouter.delete('/:id', authValidator, async (req: Request, res: Response) => {
  const isDeleted: boolean = await productsRepository.deleteProductById(req.params.id)
  if (isDeleted) {
    res.send(204)
  } else {
    res.send(404)
  }
})

productsRouter.post('/', authValidator, titleValidator, errorsValidate ,async (req: Request, res: Response) => {
  const product: Nullable<Product>= await productsRepository.createProduct({name: req.body.name})
  if (product) {
    res.sendStatus(201).send(product)
  } else {
    res.send(400)
  }
})

productsRouter.put('/:id', authValidator, titleValidator, errorsValidate, async (req: Request, res: Response) => {
  const isUpdated: boolean = await productsRepository.updateProduct({id: req.params.id, name: req.body.name })
  if(isUpdated) {
    const product: Nullable<Product> = await productsRepository.getProductById(req.params.id)
    res.status(200).send(product)
  } else {
    res.send(400)
  }
})