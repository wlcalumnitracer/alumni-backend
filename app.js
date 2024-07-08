require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const bodyparser = require("body-parser");

const authRoute = require("./routes/auth.js");

const app = express();
const PORT = process.env.APP_PORT || 3001;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// app.use("*", (req, res, next) => {
//   res.status(404).send({ message: "Route not found" });
// });

app.get("/", (req, res) => {
  res.send("test server");
});

//routes
app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => {
  console.log(`app listen to port:${PORT}`);
});
