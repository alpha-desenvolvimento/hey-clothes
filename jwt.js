require("dotenv-safe").config();
const jwt = require("jsonwebtoken");

async function authUser(args = { user: null, pwd: null }) {
  const { user, pwd } = args;

  const resp = {
    error: true,
    message: null,
    auth: false,
    token: null,
  };

  if (!user) {
    resp.message = "Must set a user to authenticate. ";
  } else if (!pwd) {
    resp.message = "Must set a password to authenticate. ";
  } else {
    resp.error = false;
    resp.auth = user == "e@mail.com" && pwd == "123456";

    const id = 1;
    if (resp.auth) {
      resp.token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 60 * 30, // expires in 30 min
      });
    } else {
      resp.token = null;
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
