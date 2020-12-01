const models = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const editProductsBalance = async (parent, { products }, context) => {
  if (!context.isAuthenticated()) {
    throw new AuthenticationError(
      "Du måste vara inloggad för att kunna utföra denna handlingen"
    );
  }
  
  const unfoundIds = [];
  const erroneousBalanceIds = [];
  const editedProducts = [];
  
  for (product of products) {
    if (product.balance < 0) {
      erroneousBalanceIds.push(product.id)
      continue
    }

    const productToEdit = await models.Product.findOne({
      where: { id: product.id },
    });

    if (productToEdit) {
      productToEdit.update({ balance: product.balance });
      editedProducts.push(productToEdit);
    } else {
      unfoundIds.push(product.id)
    }
  }
  
  if (unfoundIds.length > 0 || erroneousBalanceIds.length > 0) {
    const unfoundProducts = unfoundIds.length > 0 
      ? `Kunde inte hitta produkt(er) med artikelnummer ${unfoundIds.join(", ")}.`
      : ""
    const uneditedProducts = erroneousBalanceIds.length > 0 
      ? `Produkt(er) med artikelnummer ${erroneousBalanceIds.join(", ")} har inte ändrats - lagersaldo kan inte gå under 0.`
      : ""
    const confirmation = editedProducts.length > 0
      ? "Följande produkter har fått sina lagersaldon uppdaterade: " + editedProducts.map(({ id, balance }) => (
          `Artikelnummer ${id}: ${balance}st.`
        )).join(" ")
      : ""

    throw new Error([unfoundProducts, uneditedProducts, confirmation].filter(i => i).join(" "));
  }

  return editedProducts;
}

module.exports = editProductsBalance;