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
  editProductBalance: async ({ input }) => {
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
    },
    deleteProducts: async ({ input }) => {
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
  };

module.exports = resolve;
