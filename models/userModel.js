//require mongoose in your application alias create acess to mongoose
const mongoose = require("mongoose")

//creating(defining) a database schema
var nameSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  nickName: String,
  nIN: String,
  age: String,
  occupation: String,

});
//creating a model from the schema(to be able to interface with our database)
//model variables always begin with capital letters
var User = mongoose.model("User",nameSchema)
//export the model so that we can acess it
module.exports = mongoose.model("User",nameSchema)