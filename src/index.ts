import  express, {Request, Response} from 'express'
const app = express()
const PORT = process.env.PORT || 4009

app.get('/', (req: Request, res: Response) => {
    debugger
    res.send('Hello Node js!!!!!!!!')
})

app.listen(PORT, () => {
    console.log(`start app on port ${PORT}`)
})