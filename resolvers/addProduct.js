const models = require("../models");

const addProduct = async (parent, { input }, context) => {
  try {
    const newProduct = await models.Product.create(input);
    return newProduct;
  } catch (error) {
    console.log(error);
    throw new Error(
      `${error.message} on '${Object.entries(error.fields)[0]}': ${
        error.original.message
      }`
    );
  }
}

module.exports = addProduct;