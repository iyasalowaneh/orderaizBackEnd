const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    name: { type: DataTypes.STRING, allowNull: false },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
    cost: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    image: DataTypes.STRING,
    quantity: DataTypes.STRING,
  });
  SequelizeSlugify.slugifyModel(Item, { source: ["name"] });

  return Item;
};
