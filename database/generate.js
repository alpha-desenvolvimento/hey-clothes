require("dotenv-safe").config();
const { Pool } = require("pg"),
  { exec } = require("child_process");

var serverUrl = process.env.DATABASE_URL;
serverUrl = serverUrl.split("/");
serverUrl.pop();
serverUrl = serverUrl.join("/");
 
const pool = new Pool({ 
  connectionString: serverUrl,
});

async function createDatabase() {
  try {
    await pool.query(`CREATE DATABASE "hey-clothes"`, (err, res) => {
      if (err) console.log("Database already exists");
      else console.log("Created database");
      pool.end();
      if (
        process.env.TYPE == "dev" &&
        process.env.AUTO_RUN_MIGRATIONS == "false"
      ) {
        console.log("Sequelzie migrations was not auto runned.");
      } else {
        new Promise((resolve, reject) => {
          const migrate = exec("sequelize db:migrate", { env: process.env });

          migrate.stdout.pipe(process.stdout);
          migrate.stderr.pipe(process.stderr);
        });
      }
    });
  } catch (error) {}
}

module.exports = createDatabase;
