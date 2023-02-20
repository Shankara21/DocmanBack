module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", { timestamp: false });
  const User = sequelize.define("User", { timestamp: false });
  const Document = sequelize.define(
    "Document",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      noDoc: {
        type: DataTypes.STRING,
      },
      noRev: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATEONLY,
      },
      expDate: {
        type: DataTypes.DATEONLY,
      },
      linkDoc: {
        type: DataTypes.STRING,
      },
      categoryId: {
        type: DataTypes.INTEGER,
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
      tableName: "MstDocuments",
    }
  );
  Document.belongsTo(Category, { foreignKey: "categoryId" });
  Document.belongsTo(User, { foreignKey: "userId" });
  return Document;
};
