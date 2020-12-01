const models = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const deleteProducts = async (parent, { products }, context) => {
  if (!context.isAuthenticated()) {
    throw new AuthenticationError(
      "Du måste vara inloggad för att kunna utföra denna handlingen"
    );
  }
  
  const deletedProducts = [];
  const unfoundProducts = [];
  const productIds = products.map(product => product.id)

  for (id of productIds) {
    const productToDelete = await models.Product.findOne({where: { id: id}})
    if (!productToDelete) {
      unfoundProducts.push(id)
      continue
    }
    
    models.Product.destroy({ where: { id: id }})
    deletedProducts.push({ id: id })
  }
  
  if (unfoundProducts.length > 0) {
    const deletedConfirmation = deletedProducts.length > 0
      ? ` Alla övriga markerade produkter blev borttagna.` 
      : ""

    throw new Error (
      `Kunde inte hitta produkt(er) med artikelnummer ${unfoundProducts.join(", ")}.` + deletedConfirmation
    )
  }

  return deletedProducts
}

module.exports = deleteProducts;