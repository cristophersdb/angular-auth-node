const jwt = require("jsonwebtoken");

const generateJWT = (id, name) => {
  const payload = { id, name };
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          //TODO MAL
          console.log(err);
          reject(err);
        } else {
          //TODO BIEN
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
