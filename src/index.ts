import express, {Request, Response} from 'express'
import {productsRouter} from "./routers/productsRouter";

const PORT = process.env.PORT || 5009
const app = express()
app.use(express.json());

app.use('/products', productsRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello NodeJs')
})

app.listen(PORT, () => {
  console.log(`start app on port ${PORT} http://localhost:${PORT}`)
})