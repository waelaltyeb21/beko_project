const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Settings = sequelize.define(
  "settings",
  {
    slang: DataTypes.STRING,
    logo: DataTypes.STRING,
    contacts: {
      phone: DataTypes.STRING,
      whatsapp: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    social_media_links: {
      facebook: DataTypes.STRING,
      instagram: DataTypes.STRING,
      youtube: DataTypes.STRING,
    },
  },
  { tableName: "settings", timestamps: true }
);

module.exports = Settings;
