const { Op } = require("sequelize");
const Blog = require("../models/Blog");

const GetBlogs = async (filters = { page: 1, limit: 10 }) => {
  try {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const offset = (page - 1) * limit;

    const { rows, count } = await Blog.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      attributes: ["id", "title", "videoUrl", "status", "createdAt"],
      distinct: true,
    });

    const blogs = rows.map((blog) => {
      return {
        ...blog.toJSON(),
        title: JSON.parse(blog.title),
      };
    });

    const meta = {
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      perPage: limit,
      hasNextPage: page * limit < count,
      hasPrevPage: page > 1,
    };

    return { blogs, meta };
  } catch (error) {
    throw new Error("Error fetching blogs: " + error.message);
  }
};

const GetBlogById = async (id) => {
  try {
    const blog = await Blog.findOne({ where: { id } });
    const latestBlogs = await Blog.findAll({
      limit: 3,
      offset: 0,
      where: { id: { [Op.ne]: id } },
      order: [["createdAt", "DESC"]],
      attributes: ["id", "title", "videoUrl", "status", "createdAt"],
    });

    const formattedBlog = {
      ...blog.toJSON(),
      title: JSON.parse(blog.title),
      content: JSON.parse(blog.content),
    };

    return { blog: formattedBlog, latestBlogs };
  } catch (error) {
    throw new Error("Error fetching a blog: " + error.message);
  }
};

const CreateBlog = async (blogData) => {
  try {
    const newBlog = await Blog.create(blogData);
    return newBlog;
  } catch (error) {
    throw new Error("Error adding a new blog: " + error.message);
  }
};
const UpdateBlog = async (id, blogData) => {
  try {
    const blog = await Blog.findOne({ where: { id } });
    await blog.update(blogData);
    return blog;
  } catch (error) {
    throw new Error("Error updating blog: " + error.message);
  }
};
const DeleteBlog = async (id) => {
  try {
    const blog = await Blog.findOne({ where: { id } });
    await blog.destroy();
    return blog;
  } catch (error) {
    throw new Error("Error deleting blog: " + error.message);
  }
};
module.exports = {
  GetBlogs,
  GetBlogById,
  CreateBlog,
  UpdateBlog,
  DeleteBlog,
};
