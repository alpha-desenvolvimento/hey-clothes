var { Router, request, response } = require("express");
const { Provider } = require("../database/models").models;
const router = Router();

router.use(function (req, res, next) {
  res.append("service", ["product-provider"]);
  next();
});

router.get("/list", async (req, res) => {
  res.append("service-action", ["listAll"]);
  const responseDb = await Provider.findAll();

  if (responseDb) {
    return res.send(responseDb);
  } else {
    res.append("error", ["There's no provider records on database."]);
    return res.send(null);
  }
});

router.post("/create", async (req, res) => {
  res.append("service-action", ["create"]);
  const name = req.body.name || req.headers["x-access-name"];
  const phone = req.body.phone || req.headers["x-access-phone"];
  const createdAt = new Date();
  const updatedAt = new Date();

  if (!name || !phone) {
    res.append("error", ["Missing params on declaration."]);
    return res.send(null);
  }

  const responseDb = await Provider.create({
    name,
    phone,
  });

  if (responseDb) {
    return res.send(responseDb.dataValues);
  } else {
    res.append("error", ["There's no provider records on database."]);
    return res.send(null);
  }
});

// TODO UPDATE
// TODO DELETE


router.get("/:id", async (req, res) => {
  res.append("service-action", ["getByPk"]);
  const { id } = req.params;
  const responseDb = await Provider.findByPk(id);
  if (responseDb) {
    return res.send(responseDb);
  } else {
    res.append("error", ["Invalid ID or Provider ID don't exist."]);
    return res.send(null);
  }
});

router.all("/*", function (req, res) {
  res.append("error", ["Invalid API URI"]);
  res.status(500);
  return res.send({ error: "Invalid API URI" });
});

module.exports = router;