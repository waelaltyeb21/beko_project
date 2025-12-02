const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Product = sequelize.define(
  "products",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    slug: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    description: {
      type: DataTypes.JSON,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { tableName: "products", timestamps: true }
);

const generateSlug = (name = "") => {
  const slug = name
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-+|\-+$/g, "");

  console.log("slug: ", slug);
  return slug;
};

Product.beforeCreate(async (product) => {
  if (!product.slug && product.name) {
    product.slug = generateSlug(product.name);
  }
});

Product.beforeUpdate(async (product) => {
  if (!product.slug && product.name) {
    product.slug = generateSlug(product.name);
  }
});

module.exports = Product;
