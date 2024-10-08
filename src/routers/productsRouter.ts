import { Request, Response, Router} from "express";
import {productsRepository} from "../repositories/productsRepository";
import {errorsValidate, titleValidator} from "../validators/input-validators";

export const productsRouter = Router()

productsRouter.get('/', (req: Request, res: Response) => {
  const products = productsRepository.getProducts({title: req.query.title?.toString()})
  res.send(products)
})

productsRouter.get('/:id', (req: Request, res: Response) => {
  const product = productsRepository.getProductById(+req.params.id)
  if (product) {
    res.status(200).send(product)
  } else {
    res.send(404)
  }
})

productsRouter.delete('/:id', (req: Request, res: Response) => {
  const isDeleted = productsRepository.deleteProductById(+req.params.id)
  if (isDeleted) {
    res.send(204)
  } else {
    res.status(404).send('Product not found')
  }
})

productsRouter.post('/',titleValidator, errorsValidate ,(req: Request, res: Response) => {
  const product= productsRepository.createProduct({title: req.body.title})
  if (product) {
    res.status(201).send(product)
  } else {
    res.status(400).send('New product should have a title')
  }
})

productsRouter.put('/:id', titleValidator, errorsValidate, (req: Request, res: Response) => {
  const isUpdated = productsRepository.updateProduct({id: +req.params.id, title: req.body.title })
  if(isUpdated) {
    const product = productsRepository.getProductById(+req.params.id)
    res.status(200).send(product)
  } else {
    res.send(400)
  }
})