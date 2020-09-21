const { UserPasswordToken } = require("../database/models").models;

async function cleanOldTokens() {
  console.log("Cleaning old tokens");

  for (const token of await UserPasswordToken.findAll())
    if (token.expiration * 1000 - Date.now().toString() < 0) token.destroy();
}

module.exports = { cleanOldTokens };
