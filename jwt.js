if (process.env.NODE_ENV !== "production") require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
const { User, UserPasswordToken } = require("./database/models").models;

const expiresIn = 60 * 10; // expires in 30 min

async function authUser(args = { user: null, pwd: null }) {
  const { user, pwd } = args;

  const resp = {
    error: null,
    auth: false,
    token: null,
  };

  if (!user) {
    resp.error = "Informe um usuário para autenticar";
  } else if (!pwd) {
    resp.error = "Informe a senha para autenticar";
  } else {
    try {
      const userData = await User.findOne({ where: { email: user } });
      const { id, password: userPwd, name } = userData.dataValues;
      if (pwd == userPwd) {
        resp.auth = true;
        resp.name = name;
        resp.id = id;
        resp.token = jwt.sign({ id, user }, process.env.JWT_SECRET, {
          expiresIn,
        });
      } else {
        resp.error = "Senha inválida";
      }
    } catch (error) {
      console.log(error);
      resp.error = "Usuário não encontrado";
    }
  }

  return resp;
}

async function authToken(token) {
  const resp = {
    error: null,
    auth: false,
    token: null,
  };

  if (!token) {
    resp.error = "Necessário informar um token para auteticação";
  } else {
    await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      try {
        const { id, user, exp } = decoded;
        console.log(`Decoding token for: ${user}`);

        const userData = await User.findOne({
          where: { email: user, id },
        });

        resp.auth = id != undefined && userData.dataValues.isActive == 1;

        const refreshToken =
          (exp * 1000 - Date.now().toString()) / 1000 <= expiresIn * 0.25;

        if (resp.auth && refreshToken)
          resp.token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
        else if (!resp.auth) resp.error = "Usuário inativo";
      } catch (error) {
        console.log(error);
        resp.error = "Token inválido ou expirado";
      }
    });
  }

  return resp;
}

async function userResetToken(args = { email: null }) {
  const { email } = args;

  var user = null;

  try {
    user = await User.findOne({
      where: { email: email },
      attributes: ["id", "email"],
    });
  } catch (error) {
    return null;
  }

  if (!user) return null;

  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, {
    expiresIn,
  });

  await jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    try {
      UserPasswordToken.create({ token, expiration: decoded.exp });
    } catch (error) {}
  });

  const response = [
    token,
    jwt.sign({ token, salt: Math.random() }, process.env.JWT_SECRET, {
      expiresIn,
    }),
  ];

  return response;

  // return ;
}

async function authUserResetToken(token) {
  console.clear();
  var [tokenA, tokenB] = token.split("&");

  if (!tokenA || !tokenB) return null;

  await jwt.verify(tokenB, process.env.JWT_SECRET, async (err, decoded) => {
    tokenB = decoded;
  });

  if (!tokenB) return null;

  if (tokenA != tokenB.token) return null;

  const dbToken = await UserPasswordToken.findOne({
    attributes: ["token", "expiration"],
    where: { token: tokenA },
  });

  if (!dbToken) return null;

  await jwt.verify(
    dbToken.token,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      tokenA = decoded;
    }
  );

  if (!tokenA) return null;

  return { token: dbToken.token };
}

module.exports = { authUser, authToken, userResetToken, authUserResetToken };
