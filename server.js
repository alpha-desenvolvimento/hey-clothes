console.clear();
const { exec } = require("child_process"),
  express = require("express"),
  { json, response } = require("express"),
  path = require("path"),
  jwt = require("./jwt"),
  bodyParser = require("body-parser"),
  ServiceResponse = require("./classes/ServiceResponse"),
  cors = require("cors");
const { setInterval } = require("timers");

if (process.env.NODE_ENV !== "production") require("dotenv-safe").config();

require("./database/generate")();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ allowedHeaders: "*" }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.use("/api/provider", require("./routes/productProvider"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/category", require("./routes/productCategorie"));
app.use("/api/products", require("./routes/product"));
app.use("/api/users", require("./routes/user"));
app.use("/api/conditions", require("./routes/productCondition"));

app.use("/*", (req, res) => {
  return res.send("?");
});

app.listen(port, () => {
  if (process.env.PORT) {
    console.log(`Express running on port ${port}`);
  } else {
    console.log(`Express running http://localhost:${port}`);
  }
});

//tarefas

const { cleanOldTokens } = require("./tasks/token");

function tasks() {
  cleanOldTokens();
}

const timmer = 15 * 1000 * 60;
setInterval(tasks, timmer);
