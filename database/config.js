const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    //conección con mongoose
    //el await espera que se resuelta, para usar await hay que especificar el async
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.BD_CNN);

    //si se resuelve
    console.log("BD online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al inicializar la BD");
  }
};

module.exports = {
  dbConnection,
};
