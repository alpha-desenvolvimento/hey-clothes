const { Op } = require("sequelize"),
  { Router, request, response } = require("express");
  
const { Provider } = require("../database/models").models;
const router = Router();

router.use(function (req, res, next) {
  res.append("service", ["product-provider"]);
  next();
});

router.get("/list", async (req, res) => {
  res.append("service-action", ["listAll"]);

  var { provName } = req.query;
  const where = {};
  if (provName) where.name = { [Op.iLike]: "%" + provName + "%" };

  var hasWhere = !(
    Object.keys(where).length === 0 && where.constructor === Object
  );

  //TODO colocar em um trycatch
  const responseDb = await Provider.findAll({
    where: hasWhere ? where : null,
  });

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

  if (!name && !phone) {
    res.append("error", ["Missing params on declaration."]);
    return res.send(null);
  }
  //TODO colocar em um trycatch
  const responseDb = await Provider.create({
    name,
    phone,
  });

  if (responseDb) {
    return res.send(responseDb.dataValues);
  } else {
    res.append("error", ["Error while creating new entry."]);
    return res.send(null);
  }
});

router.post("/update", async (req, res) => {
  res.append("service-action", ["update"]);
  const id = req.body.id || req.headers["x-access-id"];
  const name = req.body.name || req.headers["x-access-name"];
  const phone = req.body.phone || req.headers["x-access-phone"];

  if (!name || !phone) {
    res.append("error", ["Missing params on declaration."]);
    return res.send(null);
  }
  var provider;
  try {
    provider = await Provider.findByPk(id);
  } catch (error) {}
  if (provider) {
    if (name) provider.name = name;
    if (phone) provider.phone = phone;
    provider.save();
    return res.json(provider);
  } else {
    res.append("error", ["Invalid ID or no provider founded"]);
    return res.send(null);
  }
});

router.post("/delete", async (req, res) => {
  // TODO Provider delete
  return res.json({ message: "erro não implementado!" });
});

router.get("/:id", async (req, res) => {
  res.append("service-action", ["getByPk"]);
  const { id } = req.params;
  const responseDb = await Provider.findByPk(id);
  if (responseDb) {
    return res.json(responseDb);
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
