const { DeleteFile } = require("../../services/UploadFiles");
const Product = require("../models/Product");

const GetProducts = async () => {
  try {
    const products = await Product.findAll();

    const formattedProducts = products.map((product) => {
      return {
        ...product.toJSON(),
        name: JSON.parse(product.name),
        description: JSON.parse(product.description),
      };
    });
    return formattedProducts;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
};

const GetProductById = async (id) => {
  try {
    const product = await Product.findOne({ where: { id } });
    return product;
  } catch (error) {
    throw new Error("Error fetching product: " + error.message);
  }
};

const CreateProduct = async (productData) => {
  try {
    const newProduct = await Product.create(productData);
    return newProduct;
  } catch (error) {
    throw new Error("Error adding a new product: " + error.message);
  }
};

const UpdateProduct = async (id, productData) => {
  try {
    const product = await Product.findOne({ where: { id } });

    if (productData.imageUrl) {
      DeleteFile(product.imageUrl, "products");
    }

    await product.update(productData);
    return product;
  } catch (error) {
    throw new Error("Error updating product: " + error.message);
  }
};

const DeleteProduct = async (id) => {
  try {
    const product = await Product.findOne({ where: { id } });

    if (product.imageUrl) {
      DeleteFile(product.imageUrl, "products");
    }

    await product.destroy();
    return product;
  } catch (error) {
    throw new Error("Error deleting product: " + error.message);
  }
};

module.exports = {
  GetProducts,
  GetProductById,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
};
