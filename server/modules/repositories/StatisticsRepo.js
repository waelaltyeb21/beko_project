const Blog = require("../models/Blog");
const Branch = require("../models/Branch");
const Product = require("../models/Product");

const GetStatistics = async () => {
  try {
    console.log("Hit🔥");
    const [totalBlogs, totalProducts, totalBranches] = await Promise.all([
      Blog.count(),
      Product.count(),
      Branch.count(),
    ]);

    const [latestBlogs, latestProducts, latestBranches] = await Promise.all([
      Blog.findAll({
        attributes: ["title", "status", "createdAt"],
        order: [["createdAt", "DESC"]],
        limit: 5,
      }),
      Product.findAll({
        attributes: ["name", "price", "imageUrl", "is_available", "createdAt"],
        order: [["createdAt", "DESC"]],
        limit: 5,
      }),
      Branch.findAll({
        attributes: ["name", "state", "city", "address", "status", "createdAt"],
        order: [["createdAt", "DESC"]],
        limit: 5,
      }),
    ]);

    return {
      totals: {
        blogs: totalBlogs,
        products: totalProducts,
        branches: totalBranches,
      },
      latest: {
        blogs: latestBlogs,
        products: latestProducts,
        branches: latestBranches,
      },
    };
  } catch (error) {
    throw new Error("Error fetching statistics: " + error.message);
  }
};

module.exports = { GetStatistics };
