const models = require('./models')

const resolve = {
  getProducts: async () => (
    await models.Product.findAll()
  ),
  addProduct: async ({ input }) => {
    try {
      const newProduct = await models.Product.create(input)
      return newProduct
    } catch (error) {
      console.log(error)
      throw new Error (`${error.message} on '${Object.entries(error.fields)[0]}': ${error.original.message}`)
    }
  },
  editBalance: async ({ input }) => {
    try {
      const product = await models.Product.findOne({ where: {id: input.id}})
      product.update({ balance: input.balance })
      return product
    } catch (error) {
      console.log(error)
      throw new Error (`Can't find product with id ${input.id}`)
    }
  }
}

module.exports = resolve;