const express = require('express')
const graphql = require('graphql')
const { graphqlHTTP } = require('express-graphql')

const schema = graphql.buildSchema(`
  type Query {
    products: [String]
  }
`)

const products = [
  "Gel",
  "Conditioner",
  "Schampoo"
]

const root = {
  products: products
}

const app = express()
app.use('/api/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))
app.listen(3000, () => console.log('Server listening on localhost:3000/api'))