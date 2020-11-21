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
    deleteProduct: async ({ input }) => {
      const productToDelete = await models.Product.findOne({where: { id: input.id}})
      if (!productToDelete) {
        throw new Error (`Could not find product with id ${input.id}`)
      }

      models.Product.destroy({ where: { id: input.id }})

      return { id: input.id }
    }
  };

module.exports = resolve;
