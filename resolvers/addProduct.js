const models = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const addProduct = async (parent, { product }, context) => {
  if (!context.isAuthenticated()) {
    throw new AuthenticationError(
      "You need to be logged in to perform this action"
    );
  }

  try {
    const newProduct = await models.Product.create(product);
    return newProduct;
  } catch (error) {
    console.log(error);
    throw new Error(
      `${error.message} on '${Object.entries(error.fields)[0]}': ${
        error.original.message
      }`
    );
  }
};

module.exports = addProduct;
