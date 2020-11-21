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

  input DeleteProduct {
    id: Int!
  }

  type Query {
    products: [Product]
  }

  type Mutation {
    addProduct(input: ProductInput): Product
    editProductBalance(input: EditProductBalanceInput): [Product]
    deleteProduct(input: DeleteProduct): ProductId
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
