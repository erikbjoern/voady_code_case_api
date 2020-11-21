const models = require("../models");

const deleteProducts = async (parent, { input }, context) => {
  const deletedProducts = [];
  const unfoundProducts = [];
  const productIds = input.products.map((product => product.id))

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
      ? ` All other products were successfully deleted.` 
      : ""

    throw new Error (
      `Could not find product(s) with id ${unfoundProducts.join(", ")}.` + deletedConfirmation
    )
  }

  return deletedProducts
}

module.exports = deleteProducts;