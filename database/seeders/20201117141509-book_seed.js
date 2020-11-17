'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        id: 13452,
        name: "Style Lab Flex Hairspray",
        brand: "Living Proof",
        volume: 225,
        purchase_price: 15,
        selling_price: 27.99
      },
      {
        id: 1230914,
        name: "VIP Texturing Hair Spray",
        brand: "Kérastase",
        volume: 200,
        purchase_price: 16,
        selling_price: 29.99
      },
      {
        id: 132342,
        name: "1-800-Hold-Me No-Crunch Flexible Hold Hairspray",
        brand: "IGK",
        volume: 150,
        purchase_price: 15,
        selling_price: 27.99
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
