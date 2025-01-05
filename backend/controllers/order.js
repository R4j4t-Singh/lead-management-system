const pool = require("../db_connection");

async function getOrders(leadID) {
  try {
    let [result] = await pool.query(
      `
      SELECT Products.name as product_name, Orders.total_price, Orders.quantity, Orders.status
      FROM Orders
      JOIN Products ON Orders.productID = Products.productID
      Where leadID = ?
      `,
      [leadID]
    );
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function addOrder(
  productID,
  restaurantID,
  total_price,
  leadID,
  quantity
) {
  try {
    let [result] = await pool.query(
      `
      INSERT INTO Orders (productID, restaurantID, total_price, leadID, quantity)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [productID, restaurantID, total_price, leadID, quantity]
    );
    return result.insertId;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function addOrders(products, leadID, restaurantID) {
  try {
    let values = products.map((product) => [
      product.productID,
      restaurantID,
      product.total_price,
      leadID,
      product.quantity,
    ]);
    await pool.query(
      `
      INSERT INTO Orders (productID, restaurantID, total_price, leadID, quantity)
      VALUES ?
      `,
      [values]
    );
  } catch (err) {
    console.log(err);
  }
}

async function setOrderStatus(leadID, status) {
  try {
    let [result] = await pool.query(
      `
      UPDATE Orders
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

module.exports = { getOrders, addOrder, addOrders, setOrderStatus };
