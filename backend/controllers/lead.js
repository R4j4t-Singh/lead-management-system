const pool = require("../db_connection");
const { addOrders, setOrderStatus } = require("./order");

async function getLeads(userID) {
  try {
    let [result] = await pool.query(
      `SELECT leadID, title, call_frequency, status, created_at 
      FROM Leads
      WHERE Leads.accountID = ? OR Leads.assigned_to = ? OR (SELECT role FROM Accounts WHERE accountID = ?) = 'admin'
      ORDER BY created_at DESC`,
      [userID, userID, userID]
    );
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getLead(id, userID) {
  try {
    let [result] = await pool.query(
      `
      SELECT *
      FROM Leads
      WHERE leadID = ? AND (accountID = ? OR assigned_to = ? OR (SELECT role FROM Accounts WHERE accountID = ?) = 'admin')
      `,
      [id, userID, userID, userID]
    );

    let [assigned_to] = await pool.query(
      `SELECT name FROM Accounts WHERE accountID = ?`,
      [result[0].assigned_to]
    );

    let [accountID] = await pool.query(
      `SELECT name FROM Accounts WHERE accountID = ?`,
      [result[0].accountID]
    );

    result[0].assigned_to = assigned_to[0].name;
    result[0].accountID = accountID[0].name;
    
    return result[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function addLead(
  title,
  call_frequency,
  assignedTo,
  restaurantID,
  total_value,
  accountID,
  products
) {
  try {
    let [result] = await pool.query(
      `
      INSERT INTO
      Leads(title, call_frequency , assigned_to, restaurantID, total_value, accountID)
      VALUES(?,?,?,?,?,?)
      `,
      [title, call_frequency, assignedTo, restaurantID, total_value, accountID]
    );

    let leadID = result.insertId;
    if (products.length > 0) await addOrders(products, leadID, restaurantID);

    return leadID;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function removeLead(leadID) {
  try {
    await pool.query(`DELETE FROM calls Where leadID = ?`, [leadID]);

    await pool.query(`DELETE FROM orders Where leadID = ?`, [leadID]);

    await pool.query(`DELETE FROM Leads Where leadID = ?`, [leadID]);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function setStatus(leadID, status) {
  await setOrderStatus(leadID, status);

  try {
    let [result] = await pool.query(
      `
      UPDATE Leads
      SET status = ?
      WHERE leadID = ?
      `,
      [status, leadID]
    );
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = { getLead, getLeads, addLead, removeLead, setStatus };
