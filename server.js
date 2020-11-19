const express = require('express')
const graphql = require('graphql')
const { graphqlHTTP } = require('express-graphql')
const models = require('./models')

const schema = graphql.buildSchema(`
  type Query {
    products: [Product]
  }

  type Product {
    id: Int,
    name: String,
    brand: String,
    volume: Int,
    purchase_price: Float,
    selling_price: Float
  }
`)

const getProducts = async () => (
  await models.Product.findAll()
)

const root = {
  products: getProducts()
}

const app = express()
app.use('/api/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))
app.listen(3000, () => console.log('Server listening on localhost:3000/api'))