const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "lead_management_system",
  })
  .promise();

module.exports = pool;
