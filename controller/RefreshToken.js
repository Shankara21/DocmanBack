const { User } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (refreshToken == null) return res.sendStatus(401);
      // const user = await User.findOne({ where: { refreshToken } });
      //   res.json({ refreshToken });
      const user = await User.findAll({
        where: {
          refreshToken: refreshToken,
        },
      });
      if (!user[0]) return res.sendStatus(403);

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, user) => {
          //   if (err) return res.sendStatus(403);
          if (err) return res.status(403).json({ message: err.message });
          const userFound = await User.findOne({
            where: { email: user.email },
          });
          //   res.json({ userFound });
          if (!userFound) return res.sendStatus(403);
          if (userFound.refreshToken !== refreshToken)
            return res.sendStatus(403);
          const accessToken = jwt.sign(
            { id: userFound.id, username: userFound.username, email: userFound.email, userLevel: userFound.userLevel, fullname : userFound.fullname },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
          );
          res.json({  accessToken });
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
