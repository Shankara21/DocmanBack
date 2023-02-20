const { Document, Category,User, sequelize } = require("../models");
const Validator = require("fastest-validator");
const v = new Validator();
const moment = require("moment");
const { where } = require("sequelize");

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
      // expDate diperoleh dari date + 4 tahun
      const expDate = new Date(req.body.date);
      // expDate.setFullYear(expDate.getFullYear() + 4);

      // expdate diperoleh dari date + 1 bulan
      // const expDate = new Date(req.body.date);
      expDate.setMonth(expDate.getMonth() + 1);

      const document = await Document.create({
        title: req.body.title,
        noDoc: req.body.noDoc,
        noRev: req.body.noRev,
        date: req.body.date,
        expDate: expDate.toISOString().split("T")[0],
        categoryId: req.body.categoryId,
        linkDoc: `/uploads/${req.file.filename}`,
        userId : 1

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
  },
  countDocument: async (req, res) => {
    try {
      const isp = await Document.count({
        where: {
          categoryId: 1,
        },
      });
      const wi = await Document.count({
        where: {
          categoryId: 2,
        },
      });
      const form = await Document.count({
        where: {
          categoryId: 3,
        },
      });
      res.status(200).json({ isp, wi, form });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  selectExp: async (req, res) => {
    try {
      const range = moment().add(1, "months").format("YYYY-MM-DD");
      const exp = await Document.findAll({
        where: {
          expDate: range,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "categoryId", "userId"],
        },
        include: [
          {
            model: Category,
            attributes: { exclude: ["createdAt", "updatedAt"] },
          },
          {
            model: User,
            attributes: { exclude: ["createdAt", "updatedAt", "password","refreshToken"] },
          }
        ]
      })
      res.status(200).json(exp);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};
