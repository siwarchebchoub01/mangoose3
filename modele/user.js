const mongoose=require("mongoose") 
 

const userSchema = new mongoose.Schema({
    name:{type:String,require:true},
    age:{type:Number},
    favoriteFoods:[String]
});
const User=mongoose.model("user",userSchema);
module.exports=User;


 