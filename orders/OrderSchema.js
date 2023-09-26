const mongoose= require("mongoose");
const orderschema=mongoose.Schema({
    catid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'staffs'
    },
    foodid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'foods'
    },
    custid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'customers'
    },count:{
            type:Number,
            required:true
    },
    date:{
            type:Date,
            required:true
    },
    comments:{
        type:String
        
    },charityStatus:{
        type:String,
        default:"pending"
    },
    charityId:{
        type:mongoose.Schema.Types.ObjectId,
       // required:true,
        ref:'charities'
    },
    status:{
        type:String,
        default:"pending"
    }
});
    module.exports=mongoose.model('orders',orderschema)
