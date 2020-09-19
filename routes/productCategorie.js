var { Router, request, response } = require("express");
const { ProductCategory } = require("../database/models").models;
const router = Router();

router.use(function (req, res, next) {
  res.append("service", ["product-category"]);
  next();
});

router.get("/list", async (req, res) => {
  res.append("service-action", ["listAll"]);
  const responseDb = await ProductCategory.findAll();

  if (responseDb) {
    return res.send(responseDb);
  } else {
    res.append("error", ["There's no category records on database."]);
    return res.send(null);
  }
});

router.post("/create", async (req, res) => {
  res.append("service-action", ["create"]);
  const description =
    req.body.description || req.headers["x-access-description"];
  const isActive = req.body.isActive || req.headers["x-access-isActive"];
  const createdAt = new Date();
  const updatedAt = new Date();

  if (!description || !isActive) {
    res.append("error", ["Missing params on declaration."]);
    return res.send(null);
  }
  var responseDb;
  try {
    responseDb = await ProductCategory.create({
      description,
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
  const id = req.body.id || req.headers["x-access-id"];
  const description =
    req.body.description || req.headers["x-access-description"];
  const isActive = req.body.isActive || req.headers["x-access-isActive"];

  var category;
  try {
    category = await ProductCategory.findByPk(id);
  } catch (error) {}

  if (!category) {
    res.append("error", ["Invalid ID or no provider founded"]);
    return res.send(null);
  }
  if (description) category.description = description;
  if (isActive) category.isActive = isActive;

  try {
    await category.save();

    return res.json(category);
  } catch (dbFail) {
    var errorMessage = "";

    // console.log(error.errors[0].message);

    for (const error of dbFail.errors) {
      if (error.message) errorMessage += `${error.message} `;
    }

    res.append("error", ["Error while updating entry."]);
    res.append("error-message", [errorMessage]);
    return res.send(null);
  }
});

// TODO category delete

router.get("/:id", async (req, res) => {
  // res.append("service-action", ["getByPk"]);
  // const { id } = req.params;
  // const responseDb = await Provider.findByPk(id);
  // if (responseDb) {
  //   return res.send(responseDb);
  // } else {
  //   res.append("error", ["Invalid ID or Provider ID don't exist."]);
  //   return res.send(null);
  // }
});

router.all("/*", function (req, res) {
  res.append("error", ["Invalid API URI"]);
  res.status(500);
  return res.send({ error: "Invalid API URI" });
});

module.exports = router;
