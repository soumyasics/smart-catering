const mongoose= require("mongoose");
const schema=mongoose.Schema({
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
    },orderid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'customers'
    },
    date:{
            type:Date,
            required:true
    },
    comment:{
        type:String
        
    },charityStatus:{
        type:String,
        default:"pending"
    },
    charityId:{
        type:mongoose.Schema.Types.ObjectId,
       // required:true,
        ref:'charities'
    }
    
});
    module.exports=mongoose.model('donations',schema)

