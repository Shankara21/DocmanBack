const { Document, Category, sequelize } = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const documents = await Document.findAll({
        include: [
          {
            model: Category,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
        ],
      });
      res.status(200).json(documents);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
