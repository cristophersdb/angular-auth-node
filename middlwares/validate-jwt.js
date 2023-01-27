const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
  //busco en la req si viene el x-token
  const token = req.header("x-token");

  //si no viene nada
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "error en el token",
    });
  }

  try {
    const { id, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    console.log();
    req.id = id;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "Token no valido",
    });
  }

  //TODO OK!
  next();
};

module.exports = {
  validateJWT,
};
