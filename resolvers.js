const models = require("./models");

const resolve = {
  getProducts: async () => await models.Product.findAll(),
  addProduct: async ({ input }) => {
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
  },
  editBalance: async ({ input }) => {
      const erronousIds = [];
      const editedProducts = [];
      
      for (product of input.products) {
        const productToEdit = await models.Product.findOne({
          where: { id: product.id },
        });

        if (productToEdit) {
          productToEdit.update({ balance: product.balance });
          editedProducts.push(productToEdit);
        } else {
          erronousIds.push(product.id)
        }
      }
      
      if (erronousIds.length > 0) {
        const error = `Couldn't find product with id ${erronousIds.join(", ")}.`
        const editedProductsIds = editedProducts.map(product => product.id)
        const confirmation = editedProductsIds.length > 0
          ? ` Product(s) with id ${editedProductsIds.join(", ")} were successfully updated` 
          : ""

        throw new Error(error + confirmation);
      }

      return editedProducts;
    },
  };

module.exports = resolve;
