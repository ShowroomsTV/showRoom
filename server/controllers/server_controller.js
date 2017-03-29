var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');
var tvmaze = require("tvmaze-node");

module.exports = {
  register: function(req,res){
    var user = new User(req.body);
    user.save(function(err,data){
      if(err){
        res.status(400).send("User did not save (╯°□°)╯︵ ┻━┻")
      }else{
        req.session.user = data;
        res.status(200).send('ヾ(⌐■_■)ノ♪');
      }
    })
  },
  login: function(req,res){
    User.findOne({email:req.body.email}, function(err,data){
      if(data == null){
        res.status(400).send("User not found (╯°□°)╯︵ ┻━┻");
      }else{
        req.session.user = data;
        res.sendStatus(200);
      }
    })
  },
  current: function(req,res){
    if(req.session.user){
      res.json(req.session.user);
    }else{
      res.status(401).send('not user in session ¯\_(ツ)_/¯');
    }
  },
  logout: function(req,res){
    req.session.destroy();
    res.redirect('/');
  },

  allShows: function(req,res){
    tvmaze.showIndex(0, function(err, data){
   if(err){
      console.log(err)
    }
    else {
      var show = JSON.parse(data)
       res.json(show);
       }
    })
  },
  oneShow: function(req,res){
    tvmaze.singleShow(req.params.name, {single : true } , function(err, data ){ // Need to pass :name to this function and replace "Lost"
     if(err){
        console.log(err)
      }
      else {
        var show = JSON.parse(data)
        res.json(show);
      }
    })
  },
  topShows: function(req,res){
    tvmaze.showIndex(0, function(err, data){
   if(err){
      console.log(err)
    }
    else {
      var show = JSON.parse(data)
          res.json(show);
             // if ( show[i]['rating']['average'] > 9) {
             //    topShows.push(i);

         // }
    }
  })
}
}
