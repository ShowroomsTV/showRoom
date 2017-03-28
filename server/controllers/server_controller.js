var mongoose = require('mongoose');
var User = mongoose.model('User');
// var tvmaze = require("tvmaze-node");

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
