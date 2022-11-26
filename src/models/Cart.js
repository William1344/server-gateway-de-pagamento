const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    code : {
      type      : String,
      required  : true,
      unique    : true,
    },
    price : {
      type      : Number,
      required  : true,
    },
  },{
    timestamps : true,
  }
); module.exports = mongoose.model('Cart', CartSchema);