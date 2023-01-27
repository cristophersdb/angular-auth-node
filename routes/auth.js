const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, loginUser, validateToken } = require("../controllers/auth");
const { validateField } = require("../middlwares/validate-fields");
const { validateJWT } = require("../middlwares/validate-jwt");

//funcion de router
const router = Router();

//definir rutas

//primer argumento el path
//segundo argumento los middlewares (uno o un arreglo[])
//tercero controlador de la ruta
//check("el campo", "el mensaje de error") permite validar los campos

//crear usuario
router.post(
  "/new",
  [
    check("name", "el nombre de usuario es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    check("password", "la contraseña es obligatoria").isLength({ min: 6 }),
    validateField,
  ],
  createUser
);

//login de usuario
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").isLength({ min: 6 }),
    validateField,
  ],
  loginUser
);

//validar token
router.get("/renew", validateJWT, validateToken);

//exportar
module.exports = router;
