const express = require("express");
const {
  getTopPerformer,
  getTopProducts,
  getBottomPerformer,
} = require("../controllers/performance");

const router = express.Router();

router.get("/top-performer-by-orders", async (req, res) => {
  const topPerformer = await getTopPerformer();
  res.send(topPerformer);
});

router.get("/top-products-by-orders", async (req, res) => {
  const topProducts = await getTopProducts();
  res.send(topProducts);
});

router.get("/bottom-performer-by-orders", async (req, res) => {
  const bottomPerformer = await getBottomPerformer();
  res.send(bottomPerformer);
});

module.exports = router;
