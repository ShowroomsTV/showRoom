var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcryptjs');
// var tvmaze = require("tvmaze-node");

module.exports = {
  register: function(req,res){
    var salt = bcrypt.genSaltSync(10);
    if(req.body.password == req.body.pass_conf){
      var hash = bcrypt.hashSync(req.body.password, salt);
      var user = new User({name:req.body.name, email:req.body.email,phone: req.body.phone, password: hash});
      user.save(function(err,data){
        if(err){
          console.log(err)
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
        res.status(400).send("User not found (╯°□°)╯︵ ┻━┻");
      }else{
        if (bcrypt.compareSync(req.body.password, user.password)) {
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
      res.status(401).send('not user in session ¯\_(ツ)_/¯');
    }
  },
  logout: function(req,res){
    req.session.destroy();
    res.redirect('/');
  }
  // tvmaze.showIndex(0, function(err, res){
  //  if(err){
  //     console.log(err)
  //   }
  //   else {
  //     var show = JSON.parse(res)
  //     // console.log(show);
  //        for (var i = 0; i < show.length; i++) {
  //          console.log(show[i]['name']);
  //          console.log(show[i]['genres']);
  //          console.log(show[i]['image']);
  //          console.log("***********************************************");
  //        }
  //     }
  //   })

}



