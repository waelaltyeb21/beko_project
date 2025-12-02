const { isAuthenticated } = require("../../middlewares/Auth");
const { upload } = require("../../services/UploadFiles");
const {
  GetAllProducts,
  GetProduct,
  AddProduct,
  UpdateTheProduct,
  DeleteTheProduct,
} = require("../controllers/ProductController");

const ProductRouter = require("express").Router();

ProductRouter.get("/", GetAllProducts);
ProductRouter.get("/:id", GetProduct);
ProductRouter.post(
  "/add-product",
  isAuthenticated,
  upload.single("product"),
  AddProduct
);
ProductRouter.put(
  "/update-product/:id",
  isAuthenticated,
  upload.single("product"),
  UpdateTheProduct
);
ProductRouter.delete("/delete-product/:id", isAuthenticated, DeleteTheProduct);

module.exports = ProductRouter;
