const { Op } = require("sequelize"),
  { Router, request, response } = require("express"),
  {
    ProductListed,
    Product,
    ProductCategory,
  } = require("../database/models").models;

const router = Router();

// let ProductController = require("../controllers/ProductController");
//  res.append("service-action", ["listAll"]);

router.use(function (req, res, next) {
  res.append("service", ["product"]);
  next();
});

// router.get("/list", async (req, res) => {});

router.get("/page/:offset", async (req, res) => {
  res.append("service-action", ["page"]);

  var { limit, prodName } = req.query;
  var { offset } = req.params;

  var limit = limit || 10;
  limit = limit > 50 ? 50 : limit;

  offset = offset * limit;

  const where = {};
  if (prodName) where.name = { [Op.like]: "%" + prodName + "%" };

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

router.post("/create", async (req, res) => {});

router.post("/update", async (req, res) => {});

router.post("/delete", async (req, res) => {
  // TODO produto delete
  return res.json({ message: "erro não implementado!" });
});

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

// function findAll(req, res) {
//   const response = new ServiceResponse("API PRODUCTS FINDALL");
//   let page = req.params.num;
//   let offset = 0;

//   if (isNaN(page) || page == 1) {
//     offset = 0;
//   } else {
//     offset = (parseInt(page) - 1) * 10;
//   }

//   let products = await ProductListed.findAndCountAll({
//     limit: 10,
//     offset: offset,
//     order: [["id", "ASC"]],
//   });

//   let next;
//   if (offset + 5 >= products.count) {
//     next = false;
//   } else {
//     next = true;
//   }

//   let result = {
//     page: parseInt(page),
//     next: next,
//     products: products,
//   };

//   let categories = await ProductCategory.findAll();

//   if (products == undefined) {
//     response.setError("Products not Found");
//     res.status(404);
//     res.json(response);
//   } else {
//     response.setData({ result: result });
//     res.status(200);
//     res.json(response);

//     var result_={
//       page: parseInt(page),
//       next: next,
//       products: products,
//     }
//   }
// }
