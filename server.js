console.clear();
const { exec } = require("child_process"),
  express = require("express"),
  { json, response } = require("express"),
  path = require("path"),
  jwt = require("./jwt"),
  bodyParser = require("body-parser"),
  ServiceResponse = require("./classes/ServiceResponse"),
  cors = require("cors");

require("dotenv-safe").config();

require("./database/generate")();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ allowedHeaders: "*" }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/provider", require("./routes/productProvider"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/category", require("./routes/productCategorie"));

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

//   return res.sendFile("index.html");
// app.use("/", router);
// let router = require("./routes/routes");
// const routes = require("./routes");

//todo api produto create /id
//todo api provider
//todo api category
//todo api usuario create

//todo update usuario

//todo delete produto /

// app.all("/api", (req, res) => {
//   const response = new ServiceResponse("Unknow API Name");

//   response.setError("Must set a API, ex: /api/<API name>");

//   return res.json(response);
// });

// app.all("/api/testServer", async (req, res) => {
//   console.log(
//     await database.Product.findAll({
//       include: [
//         {
//           model: database.ProductCategory,
//           required: true,
//         },
//       ],
//     })
//   );

//   // try {
//   //   database.User.create({ name: 'Tester 1', email: 'e@mail.com', pwd: '123456' })
//   // } catch (error) { }
// });

// app.post("/api/auth/:action", async (req, res) => {
//   const { action } = req.params;
//   var response = new ServiceResponse(
//     "Unknow API Name",
//     "Inform a right API path"
//   );

//   switch (action) {
//     case "user":
//       response = await routes.auth.user(req);
//       break;
//     case "token":
//       response = await routes.auth.token(req);
//       break;
//   }

//   return res.json(response);
// });

// app.all("/api/*", (req, res) => {
//   const response = new ServiceResponse("Unknow API Name");

//   response.setError("This API doesn't exist.");

//   return res.json(response);

//   res.data.data;
// });
