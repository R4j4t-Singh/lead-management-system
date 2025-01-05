const pool = require("../db_connection");
const { addContacts } = require("../controllers/contact");

async function getRestaurants() {
  try {
    let [result] = await pool.query("SELECT * FROM Restaurants");
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getRestaurant(id) {
  try {
    let [result] = await pool.query(
      `
      SELECT *
      FROM Restaurants
      WHERE restaurantID = ?
      `,
      [id]
    );
    return result[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function addRestaurant(name, location, contacts) {
  try {
    let [result] = await pool.query(
      `
      INSERT INTO
      Restaurants(name, location)
      VALUES(?,?)
      `,
      [name, location]
    );

    let restaurantID = result.insertId;

    if (contacts.length != 0) await addContacts(contacts, restaurantID);

    return restaurantID;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function removeRestaurant(restaurantID) {
  // try {
  //   await pool.query(`DELETE FROM Contacts WHERE restaurantID = ?`, [restaurantID])
  //   await pool.query(`DELETE FROM Leads WHERE restaurantID = ?`, [restaurantID])
  //   await pool.query(`DELETE FROM Orders WHERE restaurantID = ?`, [restaurantID])
  //   await pool.query(`DELETE FROM Restaurants WHERE restaurantID = ?`, [restaurantID])
  // } catch (err) {
  //   console.log(err);
  //   return null;
  // }
}

module.exports = {
  getRestaurant,
  getRestaurants,
  addRestaurant,
  removeRestaurant,
};
