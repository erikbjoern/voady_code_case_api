const { gql } = require('apollo-server-express')

const typeDefs = gql`
  input ProductInput {
    id: Int!
    name: String
    brand: String
    volume: Int
    balance: Int!
    purchase_price: Float
    selling_price: Float
  }

  input EditProductsBalanceInput {
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
    getProducts: [Product]
  }
  
  type AuthPayload {
    user: User
  }

  type User {
    email: String
  }

  type Mutation {
    addProduct(input: ProductInput): Product
    editProductsBalance(input: EditProductsBalanceInput): [Product]
    deleteProducts(input: DeleteProductsInput): [ProductId]
    login(email: String!, password: String!): AuthPayload
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
`;

module.exports = typeDefs;
