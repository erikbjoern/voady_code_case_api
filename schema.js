const graphql = require("graphql");

const schema = graphql.buildSchema(`
  input ProductInput {
    id: Int!
    name: String
    brand: String
    volume: Int
    balance: Int!
    purchase_price: Float
    selling_price: Float
  }

  input EditBalanceInput {
    id: Int!
    balance: Int!
  }

  type Query {
    products: [Product]
  }

  type Mutation {
    addProduct(input: ProductInput): Product
    editBalance(input: EditBalanceInput): Product
  }

  type Product {
    id: Int
    name: String
    brand: String
    volume: Int
    purchase_price: Float
    selling_price: Float
    balance: Int
  }
`);

module.exports = schema;
