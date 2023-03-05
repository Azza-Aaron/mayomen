const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const {getPassword} = require('../../db/dbUser')

const saltRounds = 10
//unused function for generating hashed password
/*function saltHash(saltRounds, password) {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      //console.log(hash)
    });
  });
}*/
/*
async function generateSessionId(username){
  const result = await getSessionId(username)
  const id = result.rows[0].id;
  console.log(id);
}

generateSessionId('bill')*/


router.post('/login',async (req,res) => {
  console.log('init login (step 1)')
  if(!req.session.user) {
    console.log('not allowed')
  }
  //req.session.views++;
  //console.log(req.session.views)

  try{
    const result = await getPassword(req.body.user)
    console.log('got password (step 2)')
    if(!result.rows.length){
      res.status(404);
      return;
    }
    const {password: dbPassword, id: userId} = result.rows[0];
    console.log('got db details (step 3)')
    if(dbPassword){
      const isValidPassword = await bcrypt.compare(req.body.password, dbPassword)
      //console.log(userId)
      if(isValidPassword){
        console.log('user seems valid(step 4)')
        req.session.user = {
          userId,
          somethingNew: 'new stuff here',
          verified: true
        }
        //console.log(result, match)
        res.status(200)
        //const user = res.rows
        res.json({user: true, views: req.session.views})
      } else {
        console.log('something failed')
        //console.log(result)
        res.status(401)
        //const user = res.rows
        res.json({user: false})
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ err: "something went wrong" });
  }
})


router.get('/authenticated', async (req, res) => {
  try{
    if(req.session?.user?.verified ?? false ){
      res.json({key: true})
      res.status(200)
    }else{
      res.json({key: false})
      res.status(401)
    }
  } catch (e) {
    console.log(e)
    res.json({key: false})
    res.status(500)
  }
})

router.get('/logout', async (req, res) => {
  console.log('init delete')
  try {
    console.log('attempting to destroy session')
    req.session.destroy()
    console.log('deleted')
    res.status(200)
    res.send()
  } catch (e) {
    console.log('delete failed')
    res.status(500)
    res.send()
  }
})

module.exports = router