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
};
