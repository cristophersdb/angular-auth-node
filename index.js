const express = require("express");
const cors = require("cors");
const path = require("path");
const { dbConnection } = require("./database/config");
require("dotenv").config();

//console.log(process.env);

//crear el servidor/aplicacion de express
const app = express();

//conexión a la base de datos
dbConnection();

//directorio publico
app.use(express.static("public"));

//cors middleware, protección del backend
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//Rutas con el middleware de express -> nombre del path y importamos el archivo auth
app.use("/api/auth", require("./routes/auth"));

//manejar rutas del front
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

//levantar aplicacion de express, listen(puerto,callback )
app.listen(process.env.PORT || 4001, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
