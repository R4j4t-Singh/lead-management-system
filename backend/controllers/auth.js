const pool = require("../db_connection");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");

async function userLogin(email, password) {
  try {
    let [
      result,
    ] = await pool.query(
      `SELECT * FROM Accounts WHERE email = ? AND password = ?`,
      [email, password]
    );

    let user = result[0];
    if (!user) {
      return null;
    }
    const sessionID = uuidv4();
    await setUser(sessionID, user.accountID);
    return sessionID;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = { userLogin };
