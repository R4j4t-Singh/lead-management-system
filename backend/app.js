const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const contactRoute = require("./routes/contact");
const leadRoute = require("./routes/leads");
const orderRoute = require("./routes/order");
const restaurantRoute = require("./routes/restaurant");
const callsRoute = require("./routes/call");
const productRoute = require("./routes/product");
const performanceRoute = require("./routes/performance");
const authRoute = require("./routes/auth");
const accountRoute = require("./routes/account");
const { checkAuthenticaion, checkAdmin } = require("./middlewear/auth");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/contacts", checkAuthenticaion, contactRoute);
app.use("/leads", checkAuthenticaion, leadRoute);
app.use("/orders", checkAuthenticaion, orderRoute);
app.use("/restaurants", checkAuthenticaion, restaurantRoute);
app.use("/calls", checkAuthenticaion, callsRoute);
app.use("/products", checkAuthenticaion, productRoute);
app.use("/performance", checkAuthenticaion, checkAdmin, performanceRoute);
app.use("/auth", authRoute);
app.use("/accounts/change-admin", checkAuthenticaion, checkAdmin, accountRoute);
app.use("/accounts", checkAuthenticaion, accountRoute);

app.get("/", (req, res) => {
  res.render("OK");
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Oops");
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("Listening on 3000");
});
