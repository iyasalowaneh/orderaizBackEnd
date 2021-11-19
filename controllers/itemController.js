const { Item } = require("../db/models");

exports.fetchItem = async (itemId, next) => {
  try {
    const item = await Item.findByPk(itemId);

    return item;
  } catch (error) {
    next(error);
  }
};

exports.itemList = async (req, res) => {
  try {
    const items = await Item.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createItem = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/${req.file.path}`;
    }
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
