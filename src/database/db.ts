import {MongoClient} from 'mongodb'
import {Product} from "../types/products";

const mongoUri = process.env.MONGODB_URI || "mongodb://0.0.0.0:27017"

const client = new MongoClient(mongoUri)
const productsDB = client.db('products')
export const productsCollection = productsDB.collection<Product>('products')

export async function runDb() {
  try{
    await client.connect()
    await client.db('products').command({ping: 1})
    console.log('Connected successfully to mongo server')
  } catch(e){
    console.log('Connected rejected to mongo server')
    console.error(e)
    await client.close()
  }
}