// require("dotenv-safe").config();
require('dotenv').config();

module.exports = {
  use_env_variable:"DATABASE_URL",
  dialect: "postgres"
}