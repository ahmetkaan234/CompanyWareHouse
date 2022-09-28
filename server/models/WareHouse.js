const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wareHouseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }

});



module.exports = mongoose.model("WareHouse", wareHouseSchema);
