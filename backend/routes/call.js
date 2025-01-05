const express = require("express");
const { getCall, getCalls, addCall } = require("../controllers/call");

const router = express.Router();

router.get("/get-calls/:leadID", async (req, res) => {
  let leadID = req.params.leadID;
  let calls = await getCalls(leadID);
  res.send(calls);
});

router.get("/get-call/:callID", async (req, res) => {
  let callID = req.params.callID;
  let call = await getCall(callID);
  res.send(call);
});

router.post("/add-call", async (req, res) => {
  let { contactID, duration, leadID } = req.body;
  let id = await addCall(req.userID, contactID, duration, leadID);
  res.sendStatus(200);
});

module.exports = router;
