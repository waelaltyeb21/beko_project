const {
  GetBlogs,
  GetBlogById,
  CreateBlog,
  UpdateBlog,
  DeleteBlog,
} = require("../repositories/BlogRepo");

const GetAllBlogs = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const blogs = await GetBlogs({ page, limit: 10 });

    return res.status(200).json(blogs);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching blogs: " + error.message });
  }
};

const GetBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await GetBlogById(id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    return res.status(200).json(blog);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching blog: " + error.message });
  }
};

const AddBlog = async (req, res) => {
  try {
    const { title, content, videoUrl, status } = req.body;
    const blogData = { title, content, videoUrl, status };
    const newBlog = await CreateBlog(blogData);

    if (!newBlog)
      return res.status(400).json({ message: "Failed to create blog" });

    return res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Error adding a new blog: " + error.message });
  }
};

const UpdateTheBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, videoUrl, status } = req.body;
    const blogData = { title, content, videoUrl, status };
    const updatedBlog = await UpdateBlog(id, blogData);

    if (!updatedBlog)
      return res.status(400).json({ message: "Failed to update blog" });

    return res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating the blog: " + error.message });
  }
};

const DeleteTheBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await DeleteBlog(id);

    if (!deletedBlog)
      return res.status(400).json({ message: "Failed to delete blog" });
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting the blog: " + error.message });
  }
};
module.exports = {
  GetAllBlogs,
  GetBlog,
  AddBlog,
  UpdateTheBlog,
  DeleteTheBlog,
};
