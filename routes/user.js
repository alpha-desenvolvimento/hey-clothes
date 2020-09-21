const { Op, json } = require("sequelize"),
  { Router, request, response } = require("express"),
  { getRequestParams } = require("../helper/requestUtils");

const { User, UserPasswordToken } = require("../database/models").models;
// const jwt = require("../jwt");
const jwt = require("jsonwebtoken");

const router = Router();

router.use(function (req, res, next) {
  res.append("service", ["user"]);
  next();
});

router.use("/list", async (req, res) => {
  res.append("service-action", ["listAll"]);

  var { userName } = req.query;
  const where = {};
  if (userName) where.name = { [Op.iLike]: "%" + userName + "%" };

  var hasWhere = !(
    Object.keys(where).length === 0 && where.constructor === Object
  );

  const responseDb = await User.findAll({
    where: hasWhere ? where : null,
    order: [
      ["isActive", "DESC"],
      ["name", "ASC"],
    ],
  });

  if (responseDb) {
    return res.send(responseDb);
  } else {
    res.append("error", ["There's no user records on database."]);
    return res.send(null);
  }
});

router.post("/create", async (req, res) => {
  const { name, email, password } = getRequestParams(req, [
    "name",
    "email",
    "password",
  ]);

  if (!name || !email || !password) {
    res.append("error-message", [
      "Informe todos os campos para gerar um usuário",
    ]);
    return res.json(null);
  }

  if (name == "" || email == "" || password == "") {
    res.append("error-message", [
      "Informe todos os campos para gerar um usuário",
    ]);
    return res.json(null);
  } else if (password.length < 6) {
    res.append("error-message", ["Senha deve contar pelo menos 6 caracteres."]);
    return res.json(null);
  } else if (password.length > 20) {
    res.append("error-message", ["Senha deve contar no máximo 20 caracteres."]);
    return res.json(null);
  }

  var newUser;

  try {
    newUser = await User.create({ name, email, password });
  } catch (error) {
    console.log(error.errors[0].message);

    if (error.errors[0].message) {
      res.append("error-message", [error.errors[0].message]);
    } else {
      res.append("error-message", [
        "Erro ao criar novo usuário, verifique os campos informados e tente novamente",
      ]);
    }
    return res.json(null);
  }

  if (!newUser.dataValues) {
    res.append("error-message", ["Erro ao criar novo usuário"]);
    return res.json(null);
  }

  return res.json({ ...newUser.dataValues });
});

router.post("/update", async (req, res) => {
  const newValues = getRequestParams(req, ["id", "name", "email", "password"]);

  //TODO users/update sempre retorna nulo para o front
  if (newValues.password && newValues.password.length < 6) {
    res.append("error-message", ["Senha deve contar pelo menos 6 caracteres."]);
    return res.json(null);
  } else if (newValues.password && newValues.password.length > 20) {
    res.append("error-message", ["Senha deve contar no máximo 20 caracteres."]);
    return res.json(null);
  }

  var user;
  try {
    user = await User.findByPk(newValues.id, { attributes: ["id"] });
  } catch (error) {
    console.log(error.errors[0].message);

    if (error.errors[0].message) {
      res.append("error-message", [error.errors[0].message]);
    } else {
      res.append("error-message", [
        "Erro ao localizar usuário, verifique os campos informados e tente novamente",
      ]);
    }
    return res.json(null);
  }

  if (!user) {
    res.append("error-message", ["Usuário não localizado"]);
    return res.json(null);
  }
  for (const key in newValues) {
    if (newValues[key]) user[key] = newValues[key];
  }

  try {
    await user.save();
  } catch (error) {
    if (error.errors[0].message) {
      res.append("error-message", [error.errors[0].message]);
    } else {
      res.append("error-message", [
        "Erro ao atualizar usuário, verifique os campos informados e tente novamente",
      ]);
    }
    return res.json(null);
  }
  return res.json({ ...user.dataValues });
});

router.post("/updatePasswordWithToken/", async (req, res) => {
  const { token, pwd } = getRequestParams(req, ["token", "pwd"]);

  const validToken = await UserPasswordToken.findOne({
    attributes: ["id", "token"],
    where: { token },
  });

  if (!validToken) return res.json(null);

  var id = null;

  await jwt.verify(
    validToken.token,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      if (!decoded) return res.json(null);
      id = decoded.id;
    }
  );

  if (!id) return res.json(null);

  const user = await User.findByPk(id);

  if (!user) return res.json(null);

  user.password = pwd;

  const action = await user
    .save()
    .then(async () => {
      UserPasswordToken.destroy({ where: { id: validToken.id } });
      // await validToken.destroy({ returning: true, checkExistance: true });
      return res.json(true);
    })
    .catch((error) => {
      return res.json(null);
    });

  // return res;
});

router.post("/delete", async (req, res) => {
  return res.json({ message: "erro não implementado!" });
}); // TODO USER delete

router.get("/:id", async (req, res) => {
  res.append("service-action", ["get by id"]);
  const { id } = req.params;
  let user;

  try {
    user = await User.findAll({ where: { id } });
  } catch (error) {
    res.append("error-message", [
      "Erro ao recuperar usuário, verifique se o id informado existe.",
    ]);
    return res.json(null);
  }

  if (!user.length > 0) {
    res.append("error-message", [
      "Erro ao recuperar usuário, verifique se o id informado existe.",
    ]);
    return res.json(null);
  }
  user = user[0].dataValues;

  user.password = undefined;

  return res.json({ ...user });
});

router.all("/*", function (req, res) {
  res.append("error", ["Invalid API URI"]);
  res.status(500);
  return res.send({ error: "Invalid API URI" });
});

module.exports = router;
