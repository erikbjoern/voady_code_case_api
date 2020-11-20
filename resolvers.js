const models = require('./models')

const resolve = {
  getProducts: async () => (
    await models.Product.findAll()
  )
}

module.exports = resolve;