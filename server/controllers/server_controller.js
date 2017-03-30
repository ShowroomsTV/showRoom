var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');
var tvmaze = require("tvmaze-node");
var twilio = require("twilio")("ACd35c7f94b47c85c402062d4aa60d27dc","ad1281c7ff090a7bde66acdf68965d5a");

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
      res.status(400).send("Show not found (╯°□°)╯︵ ┻━┻")
    }
    else {
      var show = JSON.parse(data)
       res.json(show);
       }
    })
  },
  oneShow: function(req,res){
    tvmaze.singleShow('('+ req.params.name+')', {single : true } , function(err, data ){
      if(err){
        res.status(400).send("Show not found (╯°□°)╯︵ ┻━┻")
      }
      else {
        // var stringify = JSON.stringify(data)
        var show = JSON.parse(data)
        res.json(show);
      }
    })
  },
  addFavorite: function(req,res){
    // console.log(req.body)
    tvmaze.singleShow(req.body.movie_name, {single : true }, function(err, data ){ 
      if(err){
        res.status(400).send("Show not found (╯°□°)╯︵ ┻━┻")
      }
      else {
        var show = JSON.parse(data)
        // console.log("**********",show,'*************')
        User.findOne({_id: req.params.id},function(err,user){
          if(err){
            res.status(400).send("User not found (╯°□°)╯︵ ┻━┻")
          }else{
            // console.log("data",data);
            user.shows.push(show);
            user.save(function(err,update_user){
              if(err){
                res.status(400).send("Show not found (╯°□°)╯︵ ┻━┻");
              }else{
                res.sendStatus(200);
              }
            })
          }
        })
      }
    })
  },
  getUser: function(req,res){
    User.findOne({_id: req.session.user._id},function(err,user){
      console.log("get User",user)
      if(err){
        res.status(400).send("User not found (╯°□°)╯︵ ┻━┻")
      }else{
        res.json(user);
      }
    })
  },
  activateNotification: function(req, res){
    twilio.sendMessage({
      to: "+17142139894",
      from: "+16572232861",
      body: req.body.show_name+" starts in 1 hour!" 
    }, function(err, data){
      if(err){
        console.log(err);
      }else{
        console.log(data);
      }
    });
  }
}

