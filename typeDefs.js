const { gql } = require('apollo-server-express')

const typeDefs = gql`
  input BalanceInput {
    id: Int!
    balance: Int!
  }

  input DeleteInput {
    id: Int!
  }

  input DeleteProductsInput {
    products: [DeleteInput]
  }

  input EditProductsBalanceInput {
    products: [BalanceInput]
  }

  input ProductInput {
    id: Int!
    name: String
    brand: String
    volume: Int
    balance: Int!
    purchase_price: Float
    selling_price: Float
  }
  
  type AuthPayload {
    user: User
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

  type User {
    firstName: String
    lastName: String
    email: String
  }

  type Query {
    products: [Product]
  }
  
  type Mutation {
    addProduct(input: ProductInput): Product
    editProductsBalance(input: EditProductsBalanceInput): [Product]
    deleteProducts(input: DeleteProductsInput): [ProductId]
    login(email: String!, password: String!): AuthPayload
    logout(email: String!): AuthPayload
  }
`;

module.exports = typeDefs;
