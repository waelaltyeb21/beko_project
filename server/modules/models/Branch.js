const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Branch = sequelize.define(
  "branches",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.JSON,
    state: DataTypes.STRING,
    city: DataTypes.JSON,
    address: DataTypes.JSON,
    mapsUrl: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM("soon", "open", "closed"),
      defaultValue: "open",
    },
  },
  { tableName: "branches", timestamps: true }
);
module.exports = Branch;
