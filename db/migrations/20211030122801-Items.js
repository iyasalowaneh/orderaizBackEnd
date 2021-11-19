"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Items", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      price: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
      },
      cost: {
        type: Sequelize.INTEGER,
        defaultValue: 5,
      },
      slug: {
        type: Sequelize.STRING,
        unique: true,
      },
      image: Sequelize.STRING,
      quantity: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Items");
  },
};
