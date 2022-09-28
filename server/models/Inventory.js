const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  warehouseid : {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'WareHouse'
  }
});

module.exports = mongoose.model("Inventory", InventorySchema);
