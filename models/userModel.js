const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   is_admin:{
        type:Number,
        required:true,
        default:0
    }
});

module.exports=mongoose.model("User",userSchema);

