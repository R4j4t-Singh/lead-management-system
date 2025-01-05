const pool = require("../db_connection");

async function getContacts(restaurantID) {
  try {
    let [result] = await pool.query(
      `
      SELECT *
      FROM Contacts
      WHERE restaurantID = ?
      `,
      [restaurantID]
    );
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getContact(id) {
  try {
    let [result] = await pool.query(
      `
      SELECT *
      FROM Contacts
      WHERE contactID = ?
      `,
      [id]
    );
    return result[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function addContact(name, email, mobileNo, restaurantID, role) {
  try {
    let [result] = await pool.query(
      `
      INSERT INTO
      Contacts(name, email, mobileNo, restaurantID, role)
      VALUES(?,?,?,?,?)
      `,
      [name, email, mobileNo, restaurantID, role]
    );
    return result.insertId;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function addContacts(contacts, restaurantID) {
  try {
    let values = contacts.map((contact) => [
      contact.name,
      contact.email,
      contact.mobileNo,
      restaurantID,
      contact.role,
    ]);

    await pool.query(
      `
      INSERT INTO
      Contacts(name, email, mobileNo, restaurantID, role)
      VALUES ?
      `,
      [values]
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getContact, getContacts, addContact, addContacts };
