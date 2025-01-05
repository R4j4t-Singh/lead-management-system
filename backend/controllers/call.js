const pool = require("../db_connection");

async function getCalls(leadID) {
  try {
    let [result] = await pool.query(
      `
      SELECT called_at, duration, Accounts.name as account_name, Contacts.name
      FROM Calls 
      JOIN Contacts ON Calls.contactID = Contacts.contactID
      JOIN Accounts ON Calls.accountID = Accounts.accountID
      WHERE Calls.leadID = ?
      ORDER BY Calls.called_at DESC
      `,
      [leadID]
    );
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getCall(callID) {
  try {
    let [result] = await pool.query(
      `
      SELECT *
      FROM Calls
      Where callID = ?
      `,
      [callID]
    );
    return result[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function addCall(accountID, contactID, duration, leadID) {
  try {
    let [result] = await pool.query(
      `
      INSERT INTO 
      Calls(accountID, contactID, duration, leadID)
      VALUES(?,?,?,?)
      `,
      [accountID, contactID, duration, leadID]
    );
    return result.insertId;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = { getCall, getCalls, addCall };
