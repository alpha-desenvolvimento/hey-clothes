require("dotenv-safe").config();
const jwt = require("jsonwebtoken");

const expiresIn = 60 * 30; // expires in 30 min

async function authUser(args = { user: null, pwd: null }) {
  const { user, pwd } = args;

  const resp = {
    error: null,
    auth: false,
    token: null,
  };

  if (!user) {
    resp.error = "Must set a user to authenticate. ";
  } else if (!pwd) {
    resp.error = "Must set a password to authenticate. ";
  } else {
    resp.auth = user == "e@mail.com" && pwd == "123456";
    if (resp.auth) {
      const userInfo = { user, pwd, id: 1 };
      resp.token = jwt.sign(userInfo, process.env.SECRET, { expiresIn });
    }
  }

  return resp;
}

async function authToken(token) {
  const resp = {
    error: true,
    message: null,
    auth: false,
  };

  if (!token) {
    resp.message = "Must set a token to authenticate. ";
  }

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    try {
      const { id } = decoded;
      resp.auth = id != undefined;
    } catch (error) {
      resp.auth = false;
    }
  });

  return resp;
}

module.exports = { authUser, authToken };
