const { isAuthenticated } = require("../../middlewares/Auth");
const {
  GetAllBlogs,
  GetBlog,
  AddBlog,
  UpdateTheBlog,
  DeleteTheBlog,
} = require("../controllers/BlogController");

const BlogRoutes = require("express").Router();

BlogRoutes.get("/", GetAllBlogs);
BlogRoutes.get("/:id", GetBlog);
BlogRoutes.post("/add-blog", isAuthenticated, AddBlog);
BlogRoutes.put("/update-blog/:id", isAuthenticated, UpdateTheBlog);
BlogRoutes.delete("/delete-blog/:id", isAuthenticated, DeleteTheBlog);

module.exports = BlogRoutes;
