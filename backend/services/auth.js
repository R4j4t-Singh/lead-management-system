const sessionIDtoUserID = new Map();

async function setUser(sessionID, userID) {
  sessionIDtoUserID.set(sessionID, userID);
}

async function getUser(sessionID) {
  return sessionIDtoUserID.get(sessionID);
}

module.exports = { setUser, getUser };
