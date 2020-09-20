const { Op } = require("sequelize"),
  { Router, request, response } = require("express"),
  { getRequestParams } = require("../helper/requestUtils");

const { User } = require("../database/models").models;

const router = Router();

router.use(function (req, res, next) {
  res.append("service", ["user"]);
  next();
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
