const { gql } = require('apollo-server-express')

const typeDefs = gql`
  input EditBalanceInput {
    id: String!
    balance: Int!
  }

  input DeleteInput {
    id: String!
  }

  input ProductInput {
    id: String!
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
    id: String
    name: String
    brand: String
    volume: Int
    purchase_price: Float
    selling_price: Float
    balance: Int
  }

  type ProductId {
    id: String
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
