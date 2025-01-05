const express = require("express");
const { getProducts, getProduct } = require("../controllers/product");

const router = express.Router();

router.get("/get-products", async (req, res) => {
  let products = await getProducts();
  res.send(products);
});

router.get("/get-product/:productID", async (req, res) => {
  let product = await getProduct(req.params.productID);
  res.send(product);
});

module.exports = router;
