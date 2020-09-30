const { Op } = require("sequelize"),
  { Router, request, response } = require("express"),
  { getRequestParams } = require("../helper/requestUtils");

const {
  ProductListed,
  Product,
  ProductCategory,
  ProductCondition,
} = require("../database/models").models;

const router = Router();

router.use(function (req, res, next) {
  res.append("service", ["product"]);
  next();
});

router.get("/page/:offset", async (req, res) => {
  var { offset } = req.params;
  var { limit, name } = req.query;

  console.log("req.query", req.query);

  limit = limit || 12;
  limit = limit > 50 ? 50 : limit;

  offset = offset * limit;

  const where = {};
  if (name) where.name = { [Op.iLike]: "%" + name + "%" };

  console.log("where", where);

  var hasWhere = !(
    Object.keys(where).length === 0 && where.constructor === Object
  );

  const response = {
    resultLimit: limit,
    page: offset / limit,
    next: false,
    previous: false,
    founded: 0,
    products: [],
  };

  let dbResponse;
  try {
    dbResponse = await ProductListed.findAndCountAll({
      limit,
      offset,
      order: [
        ["isActive", "DESC"],
        ["name", "ASC"],
      ],
      where: hasWhere ? where : null,
      include: [ProductCondition],
    });
  } catch (error) {
    console.log(error);
    res.append("error-message", ["Erro ao executar pesquisa de produtos"]);
    return res.json({ ...response });
  }
  response.founded = dbResponse.count;
  dbResponse = dbResponse.rows;

  // console.log(dbResponse);

  if (!dbResponse) {
    res.append("error-message", ["Erro ao executar pesquisa de produtos"]);

    return res.json({ ...response });
  }

  if (dbResponse.length <= 0) {
    res.append("error-message", [
      "Não foram encontrados produtos para a pesquisa informada.",
    ]);

    return res.json({ ...response });
  }

  for (const prod of dbResponse) {
    console.log(prod);
    response.products.push(prod.dataValues);
  }

  response.next = offset + limit <= response.founded;
  response.previous = offset > 0;
  response.pageCount = Math.floor(response.founded / response.resultLimit);

  return res.json({ ...response });
});

router.post("/create", async (req, res) => {
  console.clear();
  res.append("service-action", ["create"]);

  var prodValues = getRequestParams(req, [
    "name",
    "description",
    "price",
    "brand",
    "category",
    "imgA",
    "imgB",
    'condition',
    "createdBy",
    "provider",
    "imgC",
    "recievedAt",
    "sku",
    "soldAt",
    "imgD",
  ]);

  var newProduct;

  try {
    const now = new Date();
    newProduct = await Product.create({
      ...prodValues,
      updatedAt: now,
      createdAt: now,
    });
  } catch (error) {
    console.log(error);
    return res.json(null);
  }
  if (!newProduct.dataValues) {
    res.append("error-message", ["Erro ao criar novo registro"]);
    return res.json(null);
  }
  newProduct = newProduct.dataValues;

  return res.json({ ...newProduct });
});

router.post("/update", async (req, res) => {
  console.clear();
  console.log("update!");
  res.append("service-action", ["update"]);

  const productField = [
    "id",
    "createdBy",
    "name",
    "description",
    "price",
    "brand",
    "category",
    "imgA",
    "imgB",
    "imgC",
    "condition",
    "imgD",
    "provider",
    "recievedAt",
    "soldAt",
  ];

  const newValues = getRequestParams(req, productField);

  console.log("newValues", newValues);

  try {
    product = await Product.findByPk(newValues.id);
  } catch (error) {
    product = error;
    res.append("error-message", ["Erro ao atualizar registro"]);
    return res.json(null);
  }

  if (!product) {
    res.append("error-message", [
      "Erro ao atualizar registro produto informado não localizado.",
    ]);
    return res.json(null);
  }

  for (const key in newValues) product[key] = newValues[key];

  try {
    product.save([...productField]);
  } catch (error) {
    res.append("error-message", ["Erro ao atualizar registro"]);
    return res.json(null);
  }

  return res.json(product.dataValues);
});

router.post("/delete/:id", async (req, res) => {
  return res.json({ message: "erro não implementado!" });
}); // TODO produto delete

router.get("/:id", async (req, res) => {
  res.append("service-action", ["get by id"]);
  const { id } = req.params;

  let product;
  try {
    product = await Product.findAll({
      where: { id },
      include: [{ model: ProductCategory }, { model: ProductCondition }],
    });
  } catch (error) {
    res.append("error-message", [
      "Erro ao recuperar produto, verifique se o id informado existe.",
    ]);
    return res.json(null);
  }

  if (!product) {
    res.append("error-message", [
      "Erro ao recuperar produto, verifique se o id informado existe.",
    ]);
    return res.json(null);
  }
  var data = { ...product };

  return res.json(data);
});

router.all("/*", function (req, res) {
  res.append("error", ["Invalid API URI"]);
  res.status(500);
  return res.send({ error: "Invalid API URI" });
});

module.exports = router;
