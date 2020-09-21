var { Router, request, response } = require("express");
const { Op } = require("sequelize"),
  { ProductCategory } = require("../database/models").models,
  { getRequestParams } = require("../helper/requestUtils");

const router = Router();

router.use(function (req, res, next) {
  res.append("service", ["product-category"]);
  next();
});

router.get("/list", async (req, res) => {
  res.append("service-action", ["listAll"]);

  var { catName } = req.query;
  const where = {};
  if (catName) where.name = { [Op.iLike]: "%" + catName + "%" };

  var hasWhere = !(
    Object.keys(where).length === 0 && where.constructor === Object
  );

  const responseDb = await ProductCategory.findAll({
    where: hasWhere ? where : null,
    order: [
      ["isActive", "DESC"],
      ["name", "ASC"],
    ],
  });

  if (responseDb) {
    return res.send(responseDb);
  } else {
    res.append("error", ["There's no category records on database."]);
    return res.send(null);
  }
});

router.post("/create", async (req, res) => {
  res.append("service-action", ["create"]);
  const { name, isActive } = getRequestParams(req, ["name", "isActive"]);

  const createdAt = new Date();
  const updatedAt = new Date();

  if (!name || !isActive) {
    res.append("error", ["Missing params on declaration."]);
    return res.send(null);
  }
  var responseDb;
  try {
    responseDb = await ProductCategory.create({
      name,
      isActive,
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
  res.append("service-action", ["create"]);
  // const isActive = req.body.isActive || req.headers["x-access-isActive"];
  console.log("req.body", req.body);
  var { id, name, isActive } = getRequestParams(req, [
    "name",
    "isActive",
    "id",
  ]);

  isActive = !isActive ? 0 : isActive;

  console.log("id", id);
  console.log("name", name);
  console.log("isActive", isActive);

  var category;
  try {
    category = await ProductCategory.findByPk(id);
  } catch (error) {}

  if (!category) {
    res.append("error", ["Invalid ID or no provider founded"]);
    return res.send(null);
  }

  if (name) category.name = name;
  if (isActive === 0 || isActive === 1) category.isActive = isActive;

  try {
    await category.save();
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
  console.log(category);

  return res.json(category);
});

router.post("/delete", async (req, res) => {
  // TODO category delete
  return res.json({ message: "erro não implementado!" });
});

router.get("/:id", async (req, res) => {
  res.append("service-action", ["getByPk"]);
  const { id } = req.params;

  const responseDb = await ProductCategory.findByPk(id);

  if (responseDb) {
    return res.send(responseDb);
  } else {
    res.append("error", ["Invalid ID or Product Category ID don't exist."]);
    return res.send(null);
  }
});

router.all("/*", function (req, res) {
  res.append("error", ["Invalid API URI"]);
  res.status(500);
  return res.send({ error: "Invalid API URI" });
});

module.exports = router;
