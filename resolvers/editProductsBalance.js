const models = require("../models");

const editProductsBalance = async ({ input }) => {
  const unfoundIds = [];
  const erroneousBalanceIds = [];
  const editedProducts = [];
  
  for (product of input.products) {
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
      ? `Couldn't find product(s) with id ${unfoundIds.join(", ")}.`
      : ""
    const uneditedProducts = erroneousBalanceIds.length > 0 
      ? `Product(s) with id ${erroneousBalanceIds.join(", ")} were not edited - balance can't go below 0.`
      : ""
    const confirmation = editedProducts.length > 0
      ? "Following product(s) had their balance successfully updated: " + editedProducts.map(({ id, balance }) => (
          `Id ${id}: ${balance} pcs.`
        )).join(" ")
      : ""

    throw new Error([unfoundProducts, uneditedProducts, confirmation].filter(i => i).join(" "));
  }

  return editedProducts;
}

module.exports = editProductsBalance;