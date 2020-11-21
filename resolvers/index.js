const addProduct = require("./addProduct");
const deleteProducts = require("./deleteProducts");
const editProductsBalance = require("./editProductsBalance");
const getProducts = require("./getProducts");

const resolvers = {
  addProduct,
  deleteProducts,
  editProductsBalance,
  getProducts,
};

module.exports = resolvers;
