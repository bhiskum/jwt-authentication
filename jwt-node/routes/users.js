var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/login', (req, res) => {
  const user = {
      id: 1,
      username: "johndoe",
      email: "john.doe@test.com"
  }
  jwt.sign({user},'SuperSecRetKey', { expiresIn: 60 * 60 }, (err, token) => {
    console.log(token);
      res.json({token});
  });
});

/* Creae API route */
router.get('/', (req, res) => {
  res.json({
      msg: "Welcome to NodeJS JWT Authentication Tutorial"
  });
});

function verifyToken(req, res, next){
    
  //Request header with authorization key
  const bearerHeader = req.headers['authorization'];
  
  //Check if there is  a header
  if(typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(' ');
      
      //Get Token arrray by spliting
      const bearerToken = bearer[1];
      req.token = bearerToken;
      //call next middleware
      next();
  }else{
      res.sendStatus(403);
  }
}

router.post('/login/test', verifyToken, (req, res) => {
  jwt.verify(req.token, 'SuperSecRetKey', (err, authData)=>{
      if(err){
          res.sendStatus(403);
      }else{
          res.json({
              msg: "A new post is created",
              authData
          });
      }
  });
});

module.exports = router;
