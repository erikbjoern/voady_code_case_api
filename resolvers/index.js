const addProduct = require("./addProduct");
const deleteProducts = require("./deleteProducts");
const editProductsBalance = require("./editProductsBalance");
const getProducts = require("./getProducts");
const login = require("./login");

const resolvers = {
  Query: {
    getProducts,
  },
  Mutation: {
    addProduct,
    deleteProducts,
    editProductsBalance,
    login,
  }
};

module.exports = resolvers;
