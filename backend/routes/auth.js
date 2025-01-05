const express = require("express");
const { userLogin } = require("../controllers/auth");

const router = express.Router();

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let sessionID = await userLogin(email, password);
  if (sessionID) {
    res.send({ success: true, sessionID });
  } else {
    res.send({ success: false });
  }
});

module.exports = router;