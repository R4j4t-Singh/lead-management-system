const express = require("express");
const {
  getLead,
  getLeads,
  addLead,
  removeLead,
  setStatus,
} = require("../controllers/lead");

const router = express.Router();

router.get("/get-leads", async (req, res) => {
  let userID = req.userID;
  let leads = await getLeads(userID);
  res.send(leads);
});

router.get("/get-lead/:id", async (req, res) => {
  let id = req.params.id;
  let userID = req.userID;
  let lead = await getLead(id, userID);
  if(lead) res.send(lead);
  else res.sendStatus(404);
});

router.post("/add-lead", async (req, res) => {
  let { title, call_frequency, assignedTo, restaurantID, total_value, products } = req.body;
  let accountID = req.userID;
  let id = await addLead(
    title,
    call_frequency,
    assignedTo,
    restaurantID,
    total_value,
    accountID,
    products
  );
  res.send({ leadID: id });
});

router.get("/remove-lead/:id", async (req, res) => {
  let id = req.params.id;
  await removeLead(id);
  res.sendStatus(200);
});

router.post("/set-status", async (req, res) => {
  let { leadID, status } = req.body;
  await setStatus(leadID, status);
  res.sendStatus(200);
});

module.exports = router;
