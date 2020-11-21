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

  input EditProductBalanceInput {
    products: [BalanceInput]
  }

  input BalanceInput {
    id: Int!
    balance: Int!
  }

  input DeleteProductsInput {
    products: [DeleteInput]
  }

  input DeleteInput {
    id: Int!
  }

  type Query {
    products: [Product]
  }

  type Mutation {
    addProduct(input: ProductInput): Product
    editProductBalance(input: EditProductBalanceInput): [Product]
    deleteProducts(input: DeleteProductsInput): [ProductId]
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

  type ProductId {
    id: Int
  }
`);

module.exports = schema;
