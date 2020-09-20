if (process.env.NODE_ENV !== "production") require("dotenv-safe").config();

module.exports = {
  use_env_variable:"DATABASE_URL",
  dialect: "postgres"
}