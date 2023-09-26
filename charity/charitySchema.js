const mongoose = require("mongoose");

const sschema = mongoose.Schema({
  unitname: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  regno: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,

    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  isActive:{
    type:Boolean,
    required:true,
    default:false
  }
});
module.exports = mongoose.model("charities", sschema);
