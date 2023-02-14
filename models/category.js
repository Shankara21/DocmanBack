module.exports = (sequelize, DataTypes) => { 
  const Document = sequelize.define("Document", { timestamp: false });
  const Category = sequelize.define("Category", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    tableName: "MstCategories",
  });
  Category.hasMany(Document, { foreignKey: "categoryId" });
  return Category;
}