const express = require("express");
const { getUser, getUsers, changeAdmin } = require("../controllers/account");

const router = express.Router();

router.get("/get-user", async (req, res) => {
  let userID = req.userID;
  let user = await getUser(userID);
  if (user) {
    res.send({ success: true, user });
  } else {
    res.send({ success: false });
  }
});

router.get("/get-users", async (req, res) => {
  let users = await getUsers();
  res.send(users);
});

router.post("/change-admin", async (req, res) => {
  let { accountID } = req.body;
  let userID = req.userID;
  await changeAdmin(accountID, userID);
  res.sendStatus(200);
});

module.exports = router;
