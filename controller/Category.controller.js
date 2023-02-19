const { Category, sequelize } = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const category = await Category.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  filterByName: async (req, res) => {
    try {
      const category = await Category.findAll({
        where: {
          name: req.params.name,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  show: async (req, res) => {
    try {
      const category = await Category.findOne({
        where: {
          id: req.params.id,
        },
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
