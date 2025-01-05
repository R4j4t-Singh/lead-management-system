const express = require("express");
const {
  getRestaurant,
  getRestaurants,
  addRestaurant,
  removeRestaurant,
} = require("../controllers/restaurant");

const router = express.Router();

router.get("/get-restaurants", async (req, res) => {
  let restaurants = await getRestaurants();
  res.send(restaurants);
});

router.get("/get-restaurant/:id", async (req, res) => {
  let id = req.params.id;
  let restaurant = await getRestaurant(id);
  res.send(restaurant);
});

router.post("/add-restaurant", async (req, res) => {
  let { name, location, contacts } = req.body;
  let id = await addRestaurant(name, location, contacts);
  res.send({ restaurantID: id });
});

router.get("/remove-restaurant/:restaurantID", async (req, res) => {
  let restaurantID = req.params.restaurantID;
  await removeRestaurant(restaurantID);
  res.sendStatus(200);
});

module.exports = router;
