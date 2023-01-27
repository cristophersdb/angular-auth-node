//crear función callback

const { response } = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

//CREACION DE USUARIO
const createUser = async (req, res = response) => {
  const { name, email, password } = req.body;

  try {
    //verificar email
    const user = await User.findOne({ email });
    console.log(user);

    if (user) {
      return res.status(400).json({
        ok: false,
        message: "El usuario ya existe",
      });
    }
    //crear usuario con el modelo
    const dbUser = new User(req.body);

    //hash de la contraseña
    const salt = bcrypt.genSaltSync();
    dbUser.password = bcrypt.hashSync(password, salt);

    //generar un jsonwebtoken JWT
    const token = await generateJWT(dbUser.id, dbUser.name);

    //crear usuario de DB
    await dbUser.save();

    //generar respuesta exitosa
    return res.status(201).json({
      ok: true,
      uid: dbUser.id,
      name,
      email,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Contacta con el administrador",
    });
  }
};

//LOGIN DE USUARIO
const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //generar un usuario
    const dbUser = await User.findOne({ email });

    //validar si el usuario existe
    if (!dbUser) {
      return res.status(400).json({
        ok: false,
        message: "Credenciales incorrectas",
      });
    }

    //confirmar el match de la contraseña
    const validPassword = bcrypt.compareSync(password, dbUser.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: "El password no es válido",
      });
    }

    //Generar el JSON WEB TOKEN JWT
    const token = await generateJWT(dbUser.id, dbUser.name);

    //respuesta del servicio
    return res.json({
      ok: true,
      uid: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Contacta al administrador",
    });
  }
};

//VALIDAR TOKEN
const validateToken = async (req, res = response) => {
  //desde el validate-jwt, extraigo el id y el name
  const { id, name } = req;

  //leer base de datos para obtener el email
  const dbUser = await User.findById(id);
  const { email } = dbUser;

  //generar nuevo token
  const token = await generateJWT(id, name);
  return res.json({
    ok: true,
    uid: id,
    name,
    email,
    token,
  });
};

//exportar
module.exports = {
  createUser,
  loginUser,
  validateToken,
};
