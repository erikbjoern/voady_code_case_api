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
  }
}

module.exports = resolve;