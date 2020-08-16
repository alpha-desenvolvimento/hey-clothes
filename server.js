const express = require("express"),
  path = require("path"),
  jwt = require("./jwt"),
  rest = require("./rest"),
  bodyParser = require("body-parser"),
  cors = require("cors");

const { json } = require("express");

const app = express(),
  port = process.env.PORT || 5000,
  allowedOrigins = [
    "http://localhost:3000",
    "http://0.0.0.0:3000",
    `http://localhost:${port}`,
    `http://0.0.0.0:${port}`,
    `*`,//TODO Verificar erro de CORS no heroku
  ];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  const response = rest.apiError("Must set a API, ex: /api/apiName");
  return res.json(response);
});

app.post("/api", (req, res) => {
  const response = rest.apiError("Must set a API, ex: /api/apiName");
  return res.json(response);
});

app.post("/api/auth/:action", async (req, response) => {
  const { action } = req.params;
  var serviceStatus = 500;
  var serviceResponse = null; // = {

  if (action == "user") {
    const { user, pwd } = req.body;

    serviceResponse = { ...(await jwt.authUser({ user, pwd })) };
    serviceResponse.service = "auth.user";
  } else if (action == "token") {
    const token = req.headers["x-access-token"] || req.body.token;
    //   // return res.json(jwt.authToken(token));
    serviceResponse = { ...(await jwt.authToken(token)) };
    serviceResponse.service = "auth.token";
  }

  if (!serviceResponse.error) serviceStatus = 200;

  // console.log(serviceResponse);

  return response.status(serviceStatus).send({ ...serviceResponse });
});

app.post("/api/*", (req, res) => {
  const response = rest.apiError("This API doesn't exist.");
  return res.json(response);
});

app.get("/api/*", (req, res) => {
  const response = rest.apiError("This API doesn't exist.");
  return res.json(response);
});

app.use("/", express.static(path.resolve(__dirname, "client", "build")));

app.listen(port, () => {
  if (process.env.PORT) {
    console.log(`Express running on port ${port}`);
  } else {
    console.log(`Express running http://localhost:${port}`);
  }
});
