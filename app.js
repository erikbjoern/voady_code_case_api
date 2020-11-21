const express = require('express')
const schema = require('./schema')
const resolve = require('./resolvers')
const { graphqlHTTP } = require('express-graphql')
const bodyParser = require('body-parser')

const root = {
  products: resolve.getProducts,
  addProduct: resolve.addProduct,
  editProductBalance: resolve.editProductBalance,
}

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))
app.listen(3000, () => console.log('Server listening on localhost:3000/api/graphql'))