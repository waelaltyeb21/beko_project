const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Supervisor = sequelize.define(
  "supervisors",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "supervisors",
    timestamps: true,
  }
);

module.exports = Supervisor;
