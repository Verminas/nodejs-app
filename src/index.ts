import express, {Request, Response} from 'express'

const app = express()
app.use(express.json());
const PORT = process.env.PORT || 5009

const products = [{title: 'tomato', id: 1}, {title: 'orange', id: 2}, {title: 'apple', id: 3}]

app.get('/', (req: Request, res: Response) => {
  res.send('Hello NodeJs')
})

app.get('/products', (req: Request, res: Response) => {
  if (req.query.title) {
    const queryTitle = req.query.title.toString()
    const prodFiltered = products.filter(pr => pr.title.includes(queryTitle))
    res.send(prodFiltered)
  } else {
    res.send(products)
  }
})

app.get('/products/:id', (req: Request, res: Response) => {
  const product = products.find(i => i.id === +req.params.id)
  if (product) {
    res.status(200).send(product)
  } else {
    res.send(404)
  }
})

app.delete('/products/:id', (req: Request, res: Response) => {
  const id = +req.params.id
  const index = products.findIndex(i => i.id === id)
  if (index > -1) {
    products.splice(index, 1);
    res.send(204)
  } else {
    res.status(404).send('Product not found')
  }
})

app.post('/products', (req: Request, res: Response) => {
  const title = req.body.title
  if (title.length) {
    const newProduct = {title: title, id: Date.now()}
    products.push(newProduct)
    res.status(201).send(newProduct)
  } else {
    res.status(400).send('Title length should be more 0')
  }
})

app.put('/products/:id', (req: Request, res: Response) => {
  const id = +req.params.id
  const newTitle = req.body.title
  const product = products.find(p => p.id === id)
  if (product && newTitle.length) {
    product.title = newTitle
    res.status(200).send(product)
  } else {
    !product && res.status(404).send('Product is not found')
    !newTitle.length && res.status(400).send('Title length should be more 0')
  }
})

app.listen(PORT, () => {
  console.log(`start app on port ${PORT} http://localhost:${PORT}`)
})