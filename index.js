console.log("this is my first express")
//require express dependency to include express functionality
const express = require('express')
//require the body parser
const bodyParser = require('body-parser')
//require mongoose in your application alias create acess to mongoose to cater for database connection
const mongoose = require("mongoose")
//make our model accessible by this file
const User = require('./models/userModel')
//make our routes accessible by this file
const userRoutes = require('./routes/userRoutes')


//create an express server
const server = express()
//use userRoutes file in our work
server.use('/', userRoutes)
//use the bodyparser and pug middleware in our application
server.set('view engine', 'pug')
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
//create a mongoose server, aka database alias connect to database
//introducing an error function as a callback which throws the error incase there is one
//node-demo is the name of the database that will be created in mongodb
mongoose.connect("mongodb://localhost:27017/node-demo", {useNewUrlParser: true, useUnifiedTopology: true}, 
function(err) {
   if (err) throw err
   console.log('Successfully connected')
}
)


//NB; install nodemon and add its start to the scripts in order to restart the server automatically
/**call back function that tells the server what to do when the path is matched
 it takes two urguments; request and response
 use of arrow functions**/
 /**server.get('/', (req,res) => {
  res.render('index')
  //__dirname so that node can locate your entire file path
  //res.sendFile(__dirname + '/index.html')
})**/

/**server.get('/', (req,res) => {
   //res.render('index')
   //__dirname so that node can locate your entire file path
   res.sendFile(__dirname + '/index.html')
 })
server.post('/addname', async(req, res)=> {
   //res.send('Got a POST request')
   //console.log(req.body)
   //refactoring the code for saving to the database with try and catch block of code
   try{
      var myData = new User(req.body)
      await myData.save()
      console.log('Item has been saved')
      res.redirect('/userlist')

   }
   catch (error){
   res.status(400).send("unable to save to database") 

   }
   //saving data to the database
   /**var myData = new User(req.body)
   myData.save()
    .then(item => {
      //res.send("item saved to database")
      res.redirect('/userlist')
    })
    .catch(err => {
      res.status(400).send("unable to save to database")
    })**/
//})

//another route to access the list of entered data
/**server.get('/userlist', (req, res)=>{
User.find()
.then(items=>{
   res.render('list', {users: items})
})
.catch(err=> {
   res.status(400).send("unable to find items in the database")
})
})**/
//refactored code for another route to access the list of entered data
/**server.get('/userlist',async(req, res) => {
   try {
     let items = await User.find()
     res.render('list', { users: items })
   } catch (err) {
     res.status(400).send("unable to find items in the database");
   }
 })
//server.put('/user', (req, res)=> {
//res.send('Got a PUT request at /user')
//})
//to acess a certain route by parameters
//server.get('/users/:name', (req, res)=>{
   //res.send('Hello' + req.params.name)
//})

//to specify a query parameter
/**server.get('/users/', (req, res)=>{
   res.send('This is class' + req.query.class + 'cohort' + req.query.cohort)
})**/
//To render a custom cool error page by default in case the path specified above doesnt exist
server.get('*', (req, res)=>{
   res.send('error')
})
 
//have a server to listen to requests from browsers using the listen function from express
server.listen(3000, function() {
   console.log('listening on 3000')
})

