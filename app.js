const express = require('express')
const schema = require('./schema')
const resolve = require('./resolvers')
const { graphqlHTTP } = require('express-graphql')

const root = {
  products: resolve.getProducts()
}

const app = express()

app.use('/api/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))
app.listen(3000, () => console.log('Server listening on localhost:3000/api'))