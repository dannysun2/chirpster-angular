var express = require('express');
var router = express.Router();
// Additional requirements
var mongoose = require('mongoose');
var Chirp = mongoose.model('Chirp');
var User = mongoose.model('User');
var passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// All Chirps
router.get('/chirps', function(req, res, next) {
   Chirp.find(function(err, chirps) {
      if(err){ return next(err); }
      res.json(chirps);
   });
});

// Post Chirp
router.post('/chirps', function(req, res, next) {
   var chirp = new Chirp(req.body);
   chirp.save(function(err, chirp){
      if(err){ return next(err); }
      res.send(chirp);
   });
});

router.post('/register', function(req, res, next) {
   if(!req.body.username || !req.body.password) {
      return res.status(400).json( {message: 'Please Enter All Fields!' });
   }

   var user = new User();

   user.username = req.body.username;
   user.setPassword(req.body.password);
   user.save(function(err) {
      if (err) { return next(err); }

      return res.json({token: user.generatorJWT() })
   });
});

router.post('/login', function(req, res, next) {
   if(!req.body.username || !req.body.password) {
      return res.status(400).json( {message: 'Please Enter All Fields!'} );
   }

   passport.authenticate('local', function(err, user, info) {
      if(err) { return next(err); }

      if(user){
         return res.json({ token: user.generatorJWT() });
      } else {
         return res.status(401).json(info);
      }
   })(req, res, next);
});

// router.param('chirp', function(req, res, next, id) {
//    // establish query
//    var query = Chirp.findById(id);
//    // executes query
//    query.exec(function(err, chirp){
//       if (err) { return next(err); }
//
//       // if it doesnt find a recod with the id
//       if (!chirp) { return next(new Error ('chirp not found!')); }
//
//       req.chirp = chirp;
//       return next();
//    });
// });

module.exports = router;
