const { User } = require("../models");
const bcrypt = require("bcryptjs");
const Validator = require("fastest-validator");
const v = new Validator();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "refreshToken"],
        },
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  register: async (req, res) => {
    try {
      const {
        username,
        fullname,
        email,
        password,
        userLevel,
        confirmPassword,
      } = req.body;

      // validasi input
      const schema = {
        username: { type: "string", min: 3, max: 20 },
        fullname: { type: "string", min: 3, max: 50 },
        email: { type: "email" },
        password: { type: "string", min: 6, max: 20 },
        userLevel: { type: "string", min: 3, max: 20, optional: true },
        confirmPassword: { type: "string", min: 6, max: 20 },
      };
      const validate = v.validate(req.body, schema);
      if (validate.length) {
        return res.status(400).json({ message: validate });
      }

      //  validasi username
      const usernameExist = await User.findOne({ where: { username } });
      if (usernameExist) {
        return res.status(400).json({ message: "Username already exists" });
      }
      //   validasi email
      const emailExist = await User.findOne({ where: { email } });
      if (emailExist) {
        return res.status(400).json({ message: "Email already exists" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Password does not match" });
      }
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(password, salt);
      const user = await User.create({
        username,
        fullname,
        email,
        password: hash,
        userLevel,
      });
      // menghilangkan password dari response
      delete user.dataValues.password;
      delete user.dataValues.createdAt;
      delete user.dataValues.updatedAt;
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "Email not found" });
      }
      const validPassword = await bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          fullname: user.fullname,
          email: user.email,
          userLevel: user.userLevel,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "15s",
        }
      );
      const refreshToken = jwt.sign(
        {
          id: user.id,
          username: user.username,
          fullname: user.fullname,
          email: user.email,
          userLevel: user.userLevel,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRED,
        }
      );
      await User.update({ refreshToken }, { where: { id: user.id } });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ token: token });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  logOut: async (req, res) => {
    try {
      // res.clearCookie("refreshToken");
      // res.status(200).json({ message: "Logout success" });
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken)
        return res.status(400).json({ message: "User not logged in" });
      const user = await User.findAll({
        where: {
          refreshToken,
        },
      });
      if (!user[0]) return res.status(400).json({ message: "User not logged in" });
      await User.update({ refreshToken: null }, { where: { id: user[0].id } });
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Logout success" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
