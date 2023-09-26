const mongoose = require("mongoose");
const schema = mongoose.Schema({
  custid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "customers",
  },
  date: {
    type: Date,
    required: true,
  },
  complaint: {
    type: String,
    required: true,
  },
  orderid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "orders",
  },
  catid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "staffs",
  },
});
module.exports = mongoose.model("complaints", schema);
