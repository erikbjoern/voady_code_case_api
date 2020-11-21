const models = require("../models");

const getProducts = async () => await models.Product.findAll()

module.exports = getProducts;