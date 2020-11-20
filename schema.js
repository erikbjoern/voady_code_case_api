const graphql = require('graphql');

const schema = graphql.buildSchema(`
  type Query {
    products: [Product]
  }

  type Product {
    id: Int,
    name: String,
    brand: String,
    volume: Int,
    purchase_price: Float,
    selling_price: Float
  }
`);

module.exports = schema;