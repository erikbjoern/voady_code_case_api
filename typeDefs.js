const { gql } = require('apollo-server-express')

const typeDefs = gql`
  input EditBalanceInput {
    id: Int!
    balance: Int!
  }

  input DeleteInput {
    id: Int!
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
    addProduct(product: ProductInput): Product
    editProductsBalance(products: [EditBalanceInput]): [Product]
    deleteProducts(products: [DeleteInput]): [ProductId]
    login(email: String!, password: String!): AuthPayload
    logout(email: String!): AuthPayload
  }
`;

module.exports = typeDefs;
