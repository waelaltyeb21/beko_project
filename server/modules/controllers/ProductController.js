const { ResizeTheImage } = require("../../services/UploadFiles");
const {
  GetProducts,
  GetProductById,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../repositories/ProductRepo");

const GetAllProducts = async (req, res) => {
  try {
    const products = await GetProducts();
    return res.status(200).json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching products: " + error.message });
  }
};

const GetProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await GetProductById(id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching products: " + error.message });
  }
};

const AddProduct = async (req, res) => {
  try {
    // Get product image from request files
    if (!req.file)
      return res.status(400).json({ message: "No image uploaded" });

    const { FileName } = await ResizeTheImage(req.file);

    const { name, description, price, is_available } = req.body;
    const productData = {
      name: JSON.parse(name),
      description: JSON.parse(description),
      price,
      is_available,
      imageUrl: FileName,
    };

    const newProduct = await CreateProduct(productData);

    if (!newProduct)
      return res.status(400).json({ message: "Failed to create product" });

    return res.status(201).json({
      message: "Product created successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating a new product: " + error.message });
  }
};

const UpdateTheProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, is_available } = req.body;
    const productData = {
      name,
      description,
      price,
      imageUrl: "",
      is_available,
    };

    if (req.file) {
      const { FileName } = await ResizeTheImage(req.file);
      console.log("That what i thought.");
      productData.imageUrl = FileName;
    }

    const updatedProduct = await UpdateProduct(id, productData);

    if (!updatedProduct)
      return res.status(400).json({ message: "Failed to update product" });

    return res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating the product: " + error.message });
  }
};

const DeleteTheProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await DeleteProduct(id);

    if (!deletedProduct)
      return res.status(400).json({ message: "Failed to delete product" });

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting the product: " + error.message });
  }
};

module.exports = {
  GetAllProducts,
  GetProduct,
  AddProduct,
  UpdateTheProduct,
  DeleteTheProduct,
};
