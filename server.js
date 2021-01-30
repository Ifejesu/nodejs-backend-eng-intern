const express = require("express");
const app = express();
const validatorRoutes = require("./routes");

// load the router module
app.use("/", validatorRoutes);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
