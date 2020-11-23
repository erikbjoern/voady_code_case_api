const addProduct = require("./addProduct");
const deleteProducts = require("./deleteProducts");
const editProductsBalance = require("./editProductsBalance");
const getProducts = require("./getProducts");
const login = require("./login");
const logout = require("./logout");

const resolvers = {
  Query: {
    getProducts,
  },
  Mutation: {
    addProduct,
    deleteProducts,
    editProductsBalance,
    login,
    logout,
  }
};

module.exports = resolvers;
