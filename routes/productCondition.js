var { Router, request, response } = require("express");
const { Op } = require("sequelize"),
  { ProductCondition, Product } = require("../database/models").models,
  { getRequestParams } = require("../helper/requestUtils");

const router = Router();

router.use(function (req, res, next) {
  res.append("service", ["product-category"]);
  next();
});

router.get("/list", async (req, res) => {
  res.append("service-action", ["listAll"]);

  var { name } = req.query;
  const where = {};
  if (name) where.name = { [Op.iLike]: "%" + name.split(" ").join("%")  + "%" };

  var hasWhere = !(
    Object.keys(where).length === 0 && where.constructor === Object
  );

  const responseDb = await ProductCondition.findAll({
    where: hasWhere ? where : null,
    order: [["name", "ASC"]],
  });

  if (responseDb) {
    return res.send(responseDb);
  } else {
    return res.send(null);
  }
});

router.post("/create", async (req, res) => {
  res.append("service-action", ["create"]);
  const { name } = getRequestParams(req, ["name"]);

  const createdAt = new Date();
  const updatedAt = new Date();

  if (!name) {
    res.append("error", ["Missing params on declaration."]);
    return res.send(null);
  }
  var responseDb;
  try {
    responseDb = await ProductCondition.create({
      name,
      createdAt,
      updatedAt,
    });

    return res.json(responseDb);
  } catch (dbFail) {
    var errorMessage = "";

    for (const error of dbFail.errors) {
      if (error.message) errorMessage += `${error.message} `;
    }

    res.append("error", ["Error while creating new entry."]);
    res.append("error-message", [errorMessage]);
    return res.send(null);
  }
});

router.post("/update", async (req, res) => {
  console.log("req.body", req.body);
  var { id, name } = getRequestParams(req, ["name", "id"]);
  var condition;
  try {
    condition = await ProductCondition.findByPk(id);
  } catch (error) {}

  if (!condition) {
    res.append("error", ["Invalid ID or no provider founded"]);
    return res.send(null);
  }

  if (name) condition.name = name;

  try {
    await condition.save();
  } catch (dbFail) {
    console.log(dbFail);
    var errorMessage = "";

    for (const error of dbFail.errors) {
      if (error.message) errorMessage += `${error.message} `;
    }

    res.append("error", ["Error while updating entry."]);
    res.append("error-message", [errorMessage]);
    return res.send(null);
  }
  console.log(condition);

  return res.json(condition);
});

router.post("/delete", async (req, res) => {
  var { id } = getRequestParams(req, ["id"]);
  var condition;
  try {
    condition = await ProductCondition.findByPk(id);
  } catch (error) {
    return res.json(null);
  }

  if (!condition) return res.send(null);

  var hasProduct;
  try {
    hasProduct =
      (await Product.findOne({
        attributes: ["id"],
        where: { condition: id },
      })) != null;
  } catch (error) {
    return res.json(null);
  }
  console.log(hasProduct);

  if (hasProduct) {
    return res.json(null);
  }

  try {
    condition.destroy();
  } catch (error) {
    return res.json(null);
  }

  return res.json(true);
});

router.get("/:id", async (req, res) => {
  res.append("service-action", ["getByPk"]);
  const { id } = req.params;

  var responseDb;
  try {
    responseDb = await ProductCondition.findByPk(id);
  } catch (error) {
    return res.json(null);
  }

  var hasProduct = false;
  try {
    hasProduct =
      (await Product.findOne({
        attributes: ["id"],
        where: { condition: id },
      })) != null;
  } catch (error) {}

  responseDb.dataValues.hasProduct = hasProduct;

  if (responseDb) {
    return res.send(responseDb.dataValues);
  } else {
    return res.send(null);
  }
});

router.all("/*", function (req, res) {
  res.append("error", ["Invalid API URI"]);
  res.status(500);
  return res.send({ error: "Invalid API URI" });
});

module.exports = router;
