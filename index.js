console.log("this is my first express")
//require express dependency to include express functionality
const express = require('express')

//create an express server
const server = express();

/**call back function that tells the server what to do when the path is matched
 it takes two urguments; request and response
 use of arrow functions**/
 server.get('/', (req,res) => {
  //res.send('hello world')
  //__dirname so that node can locate your entire file path
  res.sendFile(__dirname + '/index.html')
})

//have a server to listen to requests from browsers using the listen function from express
server.listen(3000, function() {
   console.log('listening on 3000')
})

