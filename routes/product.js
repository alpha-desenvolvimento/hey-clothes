const { Op } = require("sequelize"),
  { Router, request, response } = require("express"),
  { getRequestParams } = require("../helper/requestUtils");

const {
  ProductListed,
  Product,
  ProductCategory,
} = require("../database/models").models;

const router = Router();

router.use(function (req, res, next) {
  res.append("service", ["product"]);
  next();
});

router.get("/page/:offset", async (req, res) => {
  res.append("service-action", ["page"]);

  var { limit, prodName, estoque } = req.query;
  var { offset } = req.params;

  var limit = limit || 10;
  limit = limit > 50 ? 50 : limit;

  offset = offset * limit;

  const where = {};
  if (prodName) where.name = { [Op.iLike]: "%" + prodName + "%" };

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
      order: [["id", "ASC"]],
      where: hasWhere ? where : null,
    });
  } catch (error) {
    console.log(error);
    res.append("error-message", ["Erro ao executar pesquisa de produtos"]);
    return res.json({ ...response });
  }
  response.founded = dbResponse.count;
  dbResponse = dbResponse.rows;

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
    response.products.push(prod.dataValues);
  }

  response.next = offset + limit <= response.founded;
  response.previous = offset > 0;
  response.pageCount = Math.floor(response.founded / response.resultLimit);

  return res.json({ ...response });
});

router.post("/create", async (req, res) => {
  console.clear();
  function getParam(name) {
    return req.body[name] || req.headers[`x-access-${name}`];
  }

  res.append("service-action", ["create"]);
  // const ;

  var newProduct;

  try {
    const now = new Date();
    newProduct = await Product.create({
      name: getParam("name"),
      description: getParam("description"),
      quantity: getParam("quantity"),
      category: getParam("category"),
      provider: getParam("provider"),
      createdBy: getParam("createdBy"),
      price: getParam("price"),
      brand: getParam("brand"),
      imgA: getParam("imgA"),
      imgB: getParam("imgB"),
      imgC: getParam("imgC"),
      imgD: getParam("imgD"),
      updatedAt: now,
      createdAt: now,
    });
  } catch (error) {
    newProduct = error;
    res.append("error-message", ["Erro ao criar novo registro"]);
    return res.json(null);
  }
  if (!newProduct.dataValues) {
    res.append("error-message", ["Erro ao criar novo registro"]);
    return res.json(null);
  }
  newProduct = newProduct.dataValues;

  return res.json({ ...newProduct });
});

router.post("/updateInventory/:id/:value", async (req, res) => {
  res.append("service-action", ["update inventory"]);
  var { id, value } = req.params;
  var product;
  value = parseFloat(value);

  console.log(value);

  try {
    product = await Product.findAll({
      attributes: ["quantity", "id"],
      where: { id },
      limit: 1,
    });
  } catch (error) {
    res.append("error-message", [
      "Erro ao recuperar produto, verifique se o id informado existe.",
    ]);
    return res.json(null);
  }

  if (product.length <= 0) {
    res.append("error-message", [
      "Erro ao recuperar produto, verifique se o id informado existe.",
    ]);
    return res.json(null);
  }

  product = product[0];

  product.quantity += value;

  if (product.quantity < 0) {
    res.append("error-message", [
      "Erro atualizar estoque, variação informada gera estoque negativo.",
    ]);
    return res.json(null);
  }

  try {
    await product.save();
  } catch (error) {
    res.append("error-message", ["Erro ao atualizar produto"]);
    return res.json(null);
  }

  return res.json({ ...product.dataValues });
});

router.post("/update", async (req, res) => {
  console.clear();
  res.append("service-action", ["update"]);

  const newValues = getRequestParams(req, [
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
    "imgD",
    "isActive",
  ]);

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
    product.save();
  } catch (error) {
    res.append("error-message", ["Erro ao atualizar registro"]);
    return res.json(null);
  }

  return res.json(product.dataValues);
});

router.post("/delete", async (req, res) => {
  return res.json({ message: "erro não implementado!" });
}); // TODO produto delete

router.get("/:id", async (req, res) => {
  res.append("service-action", ["get by id"]);
  const { id } = req.params;

  let product;
  try {
    product = await Product.findAll({
      where: { id },
      include: [{ model: ProductCategory }],
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
