const pool = require("../db_connection");

async function getUser(userID) {
  try {
    let [
      result,
    ] = await pool.query(
      `SELECT accountID, name, email, role FROM Accounts WHERE accountID = ?`,
      [userID]
    );
    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getuserRole(accountID) {
  try {
    let [
      result,
    ] = await pool.query(`SELECT role FROM Accounts WHERE accountID = ?`, [
      accountID,
    ]);
    return result[0].role;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getUsers() {
  try {
    let [result] = await pool.query(`SELECT accountID, name FROM Accounts`);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function changeAdmin(accountID, userID) {
  try {
    await pool.query(
      `
      UPDATE accounts SET role = "admin"
      WHERE accountID = ?
      `,
      [accountID]
    );

    await pool.query(
      `
      UPDATE accounts SET role = "employee"
      WHERE accountID = ?
      `,
      [userID]
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = { getUser, getuserRole, getUsers, changeAdmin };
