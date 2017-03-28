var mongoose = require('mongoose');
// var User = mongoose.model('User');
var tvmaze = require("tvmaze-node");

module.exports = {
  // register: function(req,res){
  //   var user = new User(req.body);
  //   user.save(function(err,data){
  //     if(err){
  //       res.status(400).send("User did not save (╯°□°)╯︵ ┻━┻")
  //     }else{
  //       req.session.user = data;
  //       res.status(200).send('ヾ(⌐■_■)ノ♪');
  //     }
  //   })
  // },
  // login: function(req,res){
  //   User.findOne({email:req.body.email}, function(err,data){
  //     if(data == null){
  //       res.status(400).send("User not found (╯°□°)╯︵ ┻━┻");
  //     }else{
  //       req.session.user = data;
  //       res.sendStatus(200);
  //     }
  //   })
  // },
  // current: function(req,res){
  //   if(req.session.user){
  //     res.json(req.session.user);
  //   }else{
  //     res.status(401).send('not user in session ¯\_(ツ)_/¯');
  //   }
  // },
  // logout: function(req,res){
  //   req.session.destroy();
  //   res.redirect('/');
  // }
  allShows: tvmaze.showIndex(0, function(err, res){
   if(err){
      console.log(err)
    }
    else {
      var show = JSON.parse(res)
         for (var i = 0; i < show.length; i++) {
             return show;
        //    console.log(show[i]['name']);
        //    console.log(show[i]['id']);
        //    console.log(show[i]['genres']);
        //    console.log(show[i]['image']);
        //    console.log(show[i]['schedule']);
        //    console.log(show[i]['rating']);
        //    console.log(show[i]['premiered']);
        //    console.log(show[i]['network']);
        //    console.log(show[i]['status']);
        //    console.log(show[i]['summary']);
         }
      }
  }),
  showOne: tvmaze.singleShow("Lost", {single : true } , function(err, res){ // Need to pass :name to this function and replace "Lost"
   if(err){
      console.log(err)
    }
    else {
      var show = JSON.parse(res)
        //    console.log(show);
            return show;
      }
  }),
  topShows: tvmaze.showIndex(0, function(err, res){
   if(err){
      console.log(err)
    }
    else {
      var show = JSON.parse(res)
      var topShows = [];
         for (var i = 0; i < show.length; i++) {
             if ( show[i]['rating']['average'] > 9) {
                topShows.push(i);
            //    console.log(show[i]['name']);
            //    console.log(show[i]['id']);
            //    console.log(show[i]['genres']);
            //    console.log(show[i]['image']);
            //    console.log(show[i]['schedule']);
            //    console.log(show[i]['rating']);
            //    console.log(show[i]['premiered']);
            //    console.log(show[i]['network']);
            //    console.log(show[i]['status']);
            //    console.log(show[i]['summary']);
           }
         }
        //  console.log(topShows, "topShows list");
         return topShows;
      }
  }),
}
