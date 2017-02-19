'use strict';
require('babel-register')({
    presets: ['react']
});

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/Users');
var Poll = require('../models/Polls');
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var ReactApp = require("../views/Components/ReactApp");
var PollPage = require("../views/Components/PollPage");
var passport = require("passport");

require("../config/passport");

/******************************************************************************
******************________AUTHENTICATION ROUTES_________***********************
******************************************************************************/

//Authentication middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("You are logged in!");
        return next(); 
    }
    console.error("You must first log in or register first!");
}

/******************
*GITHUB************
******************/

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
      req.flash('loggedin', "Who's awesome? You're awesome! Thanks for logging in.");
      res.redirect('/');
  }
);


/******************************************************************************
*****************____________Page Routing____________**************************
******************************************************************************/

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('logout', 'You have successfully logged out!');
    res.redirect('/');
});

/******************************************************************************
****************______________API Routing______________************************
******************************************************************************/

router.get('/api/me', isLoggedIn, (req, res) => {
    if(req.user === undefined) {
        res.json({});
    }else{
        res.json(req.user);
    }
});

router.post('/api/newpoll', isLoggedIn, (req, res) => {
  User.findOne({'github.username' : req.user.github.username}, (err, user) => {
      if(err){res.json(err);}
      var poll = new Poll({
          title: req.body.title,
          author: user._id,
          options: req.body.options
      });
      poll.save((err) => {
          if(err) {console.log(err);}
          console.log('Poll saved!');
          res.json({message: 'Poll saved!'});
      });
  });
});


router.post('/api/vote/:poll', (req, res) => {
    let query = {'_id' : req.params.poll,'options.text' : req.body.option};
    let update = {$inc: {'options.$.votes' : 1}};
    Poll.findOneAndUpdate(query, update, {new: true, upsert: true},(err, poll) => {
      if(poll) {
          res.json(poll);
      }else {
          Poll.findOne({'_id' : req.params.poll}, (err, poll) => {
              if(err) {res.json(err);}
              poll.options.push({text: req.body.option, votes: 1});
              poll.save();
              res.json(poll);
          });
      }
    });
});

router.get('/api/polls', (req, res) => {
    Poll.find((err,polls) => {
        if(err) {console.log(err);}
        res.json(polls);
    });
});

router.get('/api/poll/:poll', (req, res) => {
    Poll.findOne({'_id' : req.params.poll}, (err, poll) => {
       if(err){res.json(err);}
       res.json(poll);
    });
});


router.get('/api/:user/polls', isLoggedIn, (req, res) => {
    User.findOne({'github.username': req.params.user}, (err, user) => {
        if(err){res.json(err);}
        Poll.find({'author': user._id}, (err, polls) => {
            if(err){res.json(err);}
            res.json(polls);
        });
    });
});

router.delete('/api/delete/:poll', isLoggedIn, (req, res) => {
   Poll.findOne({'_id' : req.params.poll}, (err, poll) => {
       if(err) {res.json(err);}
       if(poll.author.toString() === req.user._id.toString()){
           poll.remove();
           console.log('record removed.');
           res.json({message: "Farewell, old friend."});
       }else{
          res.json({taunt: "Ah! You all went behind 'uh ear, Daniel-son!", message: "You may only delete your own polls"});
       }
   });
});


router.get('*', (req, res) => {
    var reactString = ReactDOMServer.renderToString(
        React.createElement(ReactApp)
    );
    res.render('index.ejs');
});

module.exports = router;