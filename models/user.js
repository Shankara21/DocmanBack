module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define("MstDocuments", { timestamp: false });
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        type: DataTypes.STRING,
      },
      fullname: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      refreshToken: {
        type: DataTypes.TEXT,
      },
      userLevel: {
        type: DataTypes.STRING,
        defaultValue: "User",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "MstUsers",
    }
  );
  User.hasMany(Document, { foreignKey: "userId" });
  return User;
};
