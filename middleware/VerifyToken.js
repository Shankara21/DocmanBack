const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { User } = require("../models");
dotenv.config();

module.exports = {
  verifyToken: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(403).json(err);
      req.email = user.email;
      const userFound = await User.findOne({
        where: { email: user.email },
      });
      next();
    });
  },
};
