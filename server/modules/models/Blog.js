const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Blog = sequelize.define(
  "blogs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    content: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("draft", "published", "archived"),
      defaultValue: "draft",
    },
  },
  { tableName: "blogs", timestamps: true }
);

const generateSlang = (name = "") => {
  const slang = name
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-+|\-+$/g, "");

  console.log("Slang: ", slang);
  return slang;
};

Blog.beforeCreate(async (blog) => {
  if (!blog.slang && blog.title) {
    blog.slang = generateSlang(blog.title);
  }
});

Blog.beforeUpdate(async (blog) => {
  if (!blog.slang && blog.title) {
    blog.slang = generateSlang(blog.title);
  }
});

module.exports = Blog;
