const pool = require("../db_connection");

async function getProducts() {
  try {
    let [result] = await pool.query(`SELECT * FROM Products`);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getProduct(productID) {
  try {
    let [result] = await pool.query(
      `
        SELECT * 
        FROM Products 
        WHERE productID = ?
        `,
      [productID]
    );
    return result[0];
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = { getProducts, getProduct };
