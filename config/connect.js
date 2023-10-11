const mongoose=require("mongoose") 
const connectdb=async()=>{
    try {
    mongoose.set("strictQuery",true)
    await mongoose.connect('mongodb+srv://siwarchebchoub09:siwarazert@cluster0.zqv4z09.mongodb.net/firstdatabase?retryWrites=true&w=majority&appName=AtlasApp')
    console.log("connectdb");
    
} catch (error) {
    console.log(error);
}}
module.exports=connectdb