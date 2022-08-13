const mongoose=require("mongoose")
const userschema=new mongoose.Schema(
       {
              name:String,
              location:String,
              likes:Number,
              postimage:String,
              descripation:String,
              date:String
              
       }
)

const postmodel=mongoose.model("user",userschema)
module.exports=postmodel