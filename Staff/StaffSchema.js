const mongoose= require("mongoose");

const staffschema=mongoose.Schema({
    unitname:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
  regno:{
    type:String,
        required:true
  },
    email:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
    password:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    }
    ,rating:{
        type:Number,
        default:0
    }
});
module.exports=mongoose.model('staffs',staffschema)

