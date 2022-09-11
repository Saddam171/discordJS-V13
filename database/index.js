const mongoose = require("mongoose");
const colors = require("colors");

module.exports = {
  start() {
    try {
      mongoose.connect('LINK DA DATA BASE'),
      {
        usenewurlparser: true,
        useunifiedtopology: true,
        usefindandmodify: false,
      };

      console.log(`#-------------------------- DATABASE --------------------------#`.italic.green)
      console.log(`# [DataBase] - Conectado ao Banco de Dados.`.italic.magenta)
      console.log(`#-------------------------- DATABASE --------------------------#`.italic.green)
    } catch (err) {
      if (err) return console.log(`[DataBase] - ERROR:`.italic.red, +err);
    }
  },
};