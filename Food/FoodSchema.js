const mongoose= require("mongoose");

const foodschema=mongoose.Schema({
    catid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'staffs'
    },
foodname:{
    type:String,
    required:true
},
vegornon:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
type:{
    type:String,
    required:true
},
image:{
    type:Object
},
package:{
    type:String,
    required:true
},
description:{
    type:String
},reviews:{
    type:Array
}
});
module.exports=mongoose.model('foods',foodschema)