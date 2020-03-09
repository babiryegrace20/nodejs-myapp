console.log("this is my first express")
//require express dependency to include express functionality
const express = require('express')
//create an express server
const server = express();
 
//require mongoose in your application alias create acess to mongoose
const mongoose = require("mongoose")
//create a mongoose server, aka database alias connect to database
mongoose.connect("mongodb://localhost:27017/node-demo")
//creating a database schema
var nameSchema = new mongoose.Schema({
   firstName: String,
   lastName: String
 });
//creating a model from the schema
var User = mongoose.model("User",nameSchema)

//NB; install nodemon and add its start to the scripts in order to restart the server automatically
/**call back function that tells the server what to do when the path is matched
 it takes two urguments; request and response
 use of arrow functions**/
 server.get('/', (req,res) => {
  //res.send('hello world')
  //__dirname so that node can locate your entire file path
  res.sendFile(__dirname + '/index.html')
})

server.post('/about', (req, res)=> {
   res.send('Got a POST request')
})

server.put('/user', (req, res)=> {
   res.send('Got a PUT request at /user')
})
//to acess a certain route by parameters
server.get('/users/:name', (req, res)=>{
   res.send('Hello' + req.params.name)
})

//to specify a query parameter
server.get('/users/', (req, res)=>{
   res.send('This is class' + req.query.class + 'cohort' + req.query.cohort)
})
//To render a custom cool error page by default in case the path specified above doesnt exist
server.get('*', (req, res)=>{
   res.send('error')
})
 
//have a server to listen to requests from browsers using the listen function from express
server.listen(3000, function() {
   console.log('listening on 3000')
})

