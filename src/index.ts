import express from 'express'
import {productsRouter} from "./routers/productsRouter";
import {runDb} from "./database/db";

const PORT = process.env.PORT || 5009
const app = express()
app.use(express.json());
app.use('/products', productsRouter)

app.get('/', (req, res) => {
  res.send('Hello from my first node app')
})

// app.listen(PORT, () => {
//   console.log(`start app on port ${PORT} http://localhost:${PORT}`)
// })

const startApp = async () => {
  await runDb()
  app.listen(PORT, () => {
    console.log(`start app on port ${PORT} http://localhost:${PORT}`)
  })
}

startApp()