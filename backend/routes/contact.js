const express = require("express");
const {
  getContact,
  getContacts,
  addContact,
} = require("../controllers/contact");

const router = express.Router();

router.get("/get-contacts/:restaurantID", async (req, res) => {
  let restaurantID = req.params.restaurantID;
  let contacts = await getContacts(restaurantID);
  res.send(contacts);
});

router.get("/get-contact/:id", async (req, res) => {
  let id = req.params.id;
  let contact = await getContact(id);
  res.send(contact);
});

router.post("/add-contact", async (req, res) => {
  let { name, email, mobileNo, restaurantID, role } = req.body;
  let id = await addContact(name, email, mobileNo, restaurantID, role);
  res.sendStatus(200);
});

module.exports = router;
