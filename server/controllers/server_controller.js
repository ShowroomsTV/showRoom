var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');
var tvmaze = require("tvmaze-node");
var twilio = require("twilio")("ACd35c7f94b47c85c402062d4aa60d27dc","ad1281c7ff090a7bde66acdf68965d5a");

module.exports = {
  register: function(req,res){
    var salt = bcrypt.genSaltSync(10);
    if(req.body.password == req.body.pass_conf){
      var hash = bcrypt.hashSync(req.body.password, salt);
      var user = new User({name: req.body.name, email:req.body.email,phone:req.body.phone, password: hash});
      user.save(function(err,data){
        if(err){
          res.status(400).send("User did not save (╯°□°)╯︵ ┻━┻")
        }else{
          req.session.user = data;
          res.status(200).send('ヾ(⌐■_■)ノ♪');
        }
      })
    }
  },
  login: function(req,res){
    User.findOne({email:req.body.email}, function(err,user){
      if(err){
        // console.log(err);
        res.status(400).send("User not found (╯°□°)╯︵ ┻━┻");
      }else{
        if(bcrypt.compareSync(req.body.password, user.password)){
        req.session.user = user;
        res.sendStatus(200);
        }
      }
    })
  },
  current: function(req,res){
    if(req.session.user){
      res.json(req.session.user);
    }else{
      res.status(401).send('user not in session ¯\_(ツ)_/¯');
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
        User.findOne({_id: req.session.user._id}, function(err, currentUser){
          var liked = false;
          if(err) {
            console.log(err);
          } else {
            // console.log("in the else currentuser", currentUser)
            for(var i = 0; i < currentUser.shows.length; i++) {
              if(currentUser.shows[i].name == req.params.name) {
                liked = true;
              }
            }

            var show = JSON.parse(data)
            show["liked"] = liked
            res.json(show)
          }
        })
        // var stringify = JSON.stringify(data)
        // var show = JSON.parse(data)

        // console.log(req.params);
        // // console.log(show);
        // res.json(show);
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
        User.findOne({_id: req.session.user._id},function(err,user){
          if(err){
            res.status(400).send("User not found (╯°□°)╯︵ ┻━┻")
          }else{
            // console.log("user****",user);
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
    removeFav: function(req,res){
    // console.log(req.body)
    tvmaze.singleShow(req.body.movie_name, {single : true }, function(err, data ){ 
      if(err){
        res.status(400).send("Show not found (╯°□°)╯︵ ┻━┻")
      }
      else {
        var show = JSON.parse(data)
        // console.log("**********",show,'*************')
        User.findOne({_id: req.session.user._id},function(err,user){
          if(err){
            res.status(400).send("User not found (╯°□°)╯︵ ┻━┻")
          }else{
            // console.log("user****",user);
            // var show_indexes =[]
            for(var i = 0; i < user.shows.length; i++){
              if(user.shows[i].name == show.name){
                user.shows[i] = user.shows[user.shows.length - 1]
                user.shows.pop();
              }
            }
            // user.update({$pull:{shows: {$elemMatch:{name:show.name}}}}, { multi: true })
            user.save(function(err,update_user){
              if(err){
                res.status(400).send("Show not removed (╯°□°)╯︵ ┻━┻");
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
    User.findOne({_id: req.params.id},function(err,user){
      // console.log("get User",user)
      if(err){
        res.status(400).send("User not found (╯°□°)╯︵ ┻━┻")
      }else{
        res.json(user);
      }
    })
  },
    findByFav: function(req,res){
    User.shows.find({name: req.params.name},function(err,user){
      // console.log("get User",user)
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

