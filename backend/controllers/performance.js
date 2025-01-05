const pool = require("../db_connection");

async function getTopPerformer() {
  try {
    const [result] = await pool.query(`
      SELECT Orders.restaurantID, Restaurants.name, SUM(total_price) as total_price, COUNT(orderID) as total_orders
      FROM Orders
      JOIN Restaurants 
      ON Restaurants.restaurantID = Orders.restaurantID
      WHERE Orders.status NOT IN ('cancelled', 'new')
      GROUP BY Orders.restaurantID
      ORDER BY total_price DESC
      LIMIT 5`);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getTopProducts() {
  try {
    const [result] = await pool.query(`
      SELECT Products.name, Count(Orders.orderID) as total_orders, SUM(Orders.quantity) as total_quantity, Products.measure_unit as measure_unit
      FROM Orders 
      JOIN Products 
      ON Products.productID = Orders.productID
      WHERE Orders.status NOT IN ('cancelled', 'new')
      GROUP BY Orders.productID
      ORDER BY total_orders DESC
      LIMIT 10`);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getBottomPerformer() {
  try {
    const [result] = await pool.query(`
      SELECT Orders.restaurantID, Restaurants.name, COUNT(orderID) as total_orders
      FROM Orders
      JOIN Restaurants 
      ON Restaurants.restaurantID = Orders.restaurantID
      WHERE Orders.status NOT IN ('cancelled', 'new')
      GROUP BY Orders.restaurantID
      ORDER BY total_orders ASC
      LIMIT 5`);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = { getTopPerformer, getTopProducts, getBottomPerformer };
