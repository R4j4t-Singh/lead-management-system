const { getUser } = require("../services/auth");
const { getuserRole } = require("../controllers/account");

async function checkAuthenticaion(req, res, next) {
  let sessionID = req.headers["session-token"];
  let userID = await getUser(sessionID);
  if (userID) {
    req.userID = userID;
    next();
  } else {
    res.sendStatus(401);
  }
}

async function checkAdmin(req, res, next) {
  let sessionID = req.headers["session-token"];
  let userID = await getUser(sessionID);
  let role = await getuserRole(userID);
  if (role === "admin") {
    next();
  } else {
    res.sendStatus(401);
  }
}

module.exports = { checkAuthenticaion, checkAdmin };
