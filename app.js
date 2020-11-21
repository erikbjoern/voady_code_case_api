const bodyParser = require('body-parser')
const express = require('express')
const schema = require('./schema')
const root = require('./resolvers')
const { graphqlHTTP } = require('express-graphql')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))
app.listen(3000, () => console.log('Server listening on localhost:3000/api/graphql'))