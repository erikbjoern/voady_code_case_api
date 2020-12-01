'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        id: "style-lab-13452",
        name: "Style Lab Flex Hairspray",
        brand: "Living Proof",
        volume: 225,
        purchase_price: 15,
        selling_price: 27.99,
        balance: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "VIP-texture-1230914",
        name: "VIP Texturing Hair Spray",
        brand: "Kérastase",
        volume: 200,
        purchase_price: 16,
        selling_price: 29.99,
        balance: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "1-800-hm-nc-132342",
        name: "1-800-Hold-Me No-Crunch Flexible Hold Hairspray",
        brand: "IGK",
        volume: 150,
        purchase_price: 15,
        selling_price: 27.99,
        balance: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
