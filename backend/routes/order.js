const express = require("express");
const { getOrders } = require("../controllers/order");

const router = express.Router();

router.get("/get-orders/:leadID", async (req, res) => {
  let leadID = req.params.leadID;
  let orders = await getOrders(leadID);
  res.send(orders);
});

module.exports = router;
