var { Router, request, response } = require("express"),
  jwt = require("../jwt"),
  { getRequestParams } = require("../helper/requestUtils");

const { Provider, User } = require("../database/models").models;
const router = Router();

router.use(function (req, res, next) {
  res.append("service", ["auth"]);
  next();
});

router.post("/user", async (req, res) => {
  res.append("service-action", ["user"]);

  const { user, pwd } = getRequestParams(req, ["user", "pwd"]);

  const jwtResponse = await jwt.authUser({ user, pwd });

  if (jwtResponse.error) {
    res.append("error", [jwtResponse.error]);
    return res.send(null);
  } else {
    const { auth, token, name, id } = jwtResponse;

    return res.json({
      auth,
      token,
      name,
      id,
    });
  }
});

router.post("/token", async (req, res) => {
  res.append("service-action", ["token"]);

  const jwtResponse = await jwt.authToken(
    req.headers["x-access-token"] || req.body.token
  );

  if (jwtResponse.error) {
    res.append("error", [jwtResponse.error]);
    return res.send(null);
  } else {
    const { auth, token, name } = jwtResponse;

    return res.json({ auth, token, name });
  }
});

router.post("/resetPassword/email", async (req, res) => {
  const { email } = getRequestParams(req, ["email"]);

  const jwtResponse = await jwt.userResetToken({ email });

  if (!jwtResponse) return res.json(null);

  return res.send(jwtResponse.join("&"));
});

router.post("/resetPassword/token", async (req, res) => {
  const { token } = getRequestParams(req, ["token"]);

  if (!token) return res.json(null);

  const jwtResponse = await jwt.authUserResetToken(token);

  if (!jwtResponse) return res.json(null);

  return res.json({ ...jwtResponse });
});

module.exports = router;
