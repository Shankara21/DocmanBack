const { Document, Category, sequelize } = require("../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
  index: async (req, res) => {
    try {
      const documents = await Document.findAll({
        where: {
          categoryId: req.params.id,
        },
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
  create: async (req, res) => {
    try {
      console.log(req);
      // expDate diperoleh dari date + 4 tahun
      const expDate = new Date(req.body.date);
      expDate.setFullYear(expDate.getFullYear() + 4);

      const document = await Document.create({
        title: req.body.title,
        noDoc: req.body.noDoc,
        noRev: req.body.noRev,
        date: req.body.date,
        expDate: expDate.toISOString().split("T")[0],
        categoryId: req.body.categoryId,
        linkDoc: `/uploads/${req.file.filename}`,
      });
      res.status(200).json(document);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  storeDocument: async (req, res) => { 
    try {
      const expDate = new Date(req.body.date);
      expDate.setFullYear(expDate.getFullYear() + 4);
      const document = await Document.create({
        title: req.body.title,
        noDoc: req.body.noDoc,
        noRev: req.body.noRev,
        date: req.body.date,
        expDate: expDate.toISOString().split("T")[0],
        categoryId: req.body.categoryId,
        linkDoc: req.body.linkDoc,
      });
      res.status(200).json(document);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
