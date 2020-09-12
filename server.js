const express = require("express"),
  { json } = require("express"),
  path = require("path"),
  jwt = require("./jwt"),
  // rest = require("./rest"),
  bodyParser = require("body-parser"),
  ServiceResponse = require("./classes/ServiceResponse"),
  cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ allowedHeaders: "*" }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.all("/api", (req, res) => {
// const response = rest.apiError("Must set a API, ex: /api/apiName");
//   return res.json(response);
// });

app.all("/api", (req, res) => {
  const response = new ServiceResponse("Unknow API Name");

  response.setError("Must set a API, ex: /api/<API name>");

  return res.json(response);
});

app.post("/api/auth/:action", async (req, res) => {
  const { action } = req.params;
  const response = new ServiceResponse(
    "Unknow API Name",
    "Inform a right API path"
  );
  switch (action) {
    case "user":
      response.setServiceName("auth.user");

      const user = req.body.user || req.headers["x-access-user"],
        pwd = req.body.pwd || req.headers["x-access-pwd"];

      const data = await jwt.authUser({ user, pwd });

      if (data.error) {
        response.setError(data.error);
      } else {
        response.setData({ auth: data.auth, token: data.token });
      }

      break;
  }

  return res.json(response);

  //
  //   } else if (action == "token") {
  //     const token = req.headers["x-access-token"] || req.body.token;
  //     //   // return res.json(jwt.authToken(token));
  //     serviceResponse = { ...(await jwt.authToken(token)) };
  //     serviceResponse.service = "auth.token";
  //   }

  //   if (!serviceResponse.error) serviceStatus = 200;

  //   // console.log(serviceResponse);

  //   return response.status(serviceStatus).send({ ...serviceResponse });
});

app.all("/api/*", (req, res) => {
  const response = new ServiceResponse("Unknow API Name");

  response.setError("This API doesn't exist.");

  return res.json(response);
});

app.use("/*", (req, res) => {
  return res.sendfile("./index.html");
});

app.listen(port, () => {
  if (process.env.PORT) {
    console.log(`Express running on port ${port}`);
  } else {
    console.log(`Express running http://localhost:${port}`);
  }
});
