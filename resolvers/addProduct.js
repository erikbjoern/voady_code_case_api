const models = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const addProduct = async (parent, { product }, context) => {
  if (!context.isAuthenticated()) {
    throw new AuthenticationError(
      "Du måste vara inloggad för att kunna utföra denna handlingen"
    );
  }

  try {
    const newProduct = await models.Product.create(product);
    return newProduct;
  } catch (error) {
    console.log(error);
    if (await models.Product.findOne({ where: { id: product.id } })) {
      throw new Error("En produkt med detta artikelnummer finns redan i databasen.");
    } else {
      throw new Error(error.message);
    }
  }
};

module.exports = addProduct;
