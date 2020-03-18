//require express dependency to include express functionality
const express = require('express')
//require the express.router function to cater for the routes
const router = express.Router()
//make the modles accessible to this file
const User = require('../models/userModel')
const path = require('path');
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
  })

/**router.get('/', (req,res) => {
  //__dirname so that node can locate your entire file path
  res.sendFile('/Users/GRACE/Desktop/refactory/myapp/index.html')
})**/
router.post('/addname', async(req, res)=> {
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
})

//another route to access the list of entered data
//refactored code for another route to access the list of entered data
router.get('/userlist',async(req, res) => {
  try {
    let items = await User.find()
    if (req.query.nickName){
      items = await User.find({nickName:req.query.nickName})
    }
    res.render('list', { users: items })
  } catch (err) {
    res.status(400).send("unable to find items in the database");
  }
})
//exporting the routers
module.exports = router 