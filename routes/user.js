var express = require("express");
var router = express.Router();
var passport = require("passport");
const {
  isloggedIn,
  signupValidator,
  signinValidator,
  notLoggedIn,
} = require("../middlewares/auth");
const userSchema = require("../models/userModel");
const fileSchema=require('../models/fileModel')
router.post("/signin", notLoggedIn, signinValidator,  (req, res, next) => {
  passport.authenticate("local.signin", (err, user, info) => {
    console.log(err,user,info);
    if (err) {
      return next(err);
    }
    res.json({
      info,
      auth: req.isAuthenticated(),
      user: { name: user.name, email: user.email },
    });
  })(req, res, next);
});

router.post("/signup", signupValidator, (req, res, next) => {
  passport.authenticate("local.signup", (err, user, info) => {
    if (err) {
      return next(err);
    }

    res.json({ info });
  })(req, res, next);
});


router.get('/getfile', isloggedIn, (req, res, next) => {
  if(req.user.isAdmin===0)
    userSchema.findById(req.user.id).populate('files', 'name').then(data => {
    console.log(data.files);
      res.send(data.files)
    })
  else
    fileSchema.find({},{id:1,name:1}).populate('by', 'name').then(data => {
      res.send(data)
      
    })
})

router.get("/logout", isloggedIn, (req, res, next) => {
  req.logout();

  res.json({ auth: req.isAuthenticated() });
});
router.get("/isloggedin", (req, res) => {
  if(req.isAuthenticated())
    res.json({
      auth: req.isAuthenticated(),
      isAdmin:req.user.isAdmin
    });
  else 
    res.json({
      auth: req.isAuthenticated(),
      isAdmin:null
    })
});

module.exports = router;
