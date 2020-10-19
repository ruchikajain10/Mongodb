const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

const bodyParser = require('body-parser')
const connect = require('./dbconnect');
app.use(bodyParser.urlencoded({ extended: false }));

const User = require('./models/user')

// parse application/json
app.use(bodyParser.json())


router.get('/abc', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/login.html'));
});

router.post('/', (req, res) => {
  
  User.find({email :req.body.username}).then(userFound => {
    console.log(userFound);
    if(userFound[0].password == req.body.password){
      res.send('<h1>Login Successful');
    }else{
      res.send('<h1>Please Check the password</h1>')
    }
  }).catch(err => console.log(err));
  
});

router.get('/register', function (req, res) {
  res.sendFile(path.join(__dirname + '/register.html'));
});
router.post('/register', (req, res, next) => {
  let user = new User({
    email: req.body.username,
    password: req.body.password
  });

  user.save().then(userCreated => {
    res.sendFile(path.join(__dirname + '/login.html'));
  }).catch(err => next(err));
});
router.get('/forgotpassword', function (req, res) {
  res.sendFile(path.join(__dirname + '/forgotpassword.html'));
});



//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
