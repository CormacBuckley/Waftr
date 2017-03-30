import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


Meteor.startup(() => {
  // code to run on server at startup
  //Sets MAIL_URL - Should be done as a Shell command.
//  process.env.MAIL_URL = 'smtp://postmaster%40<postmaster@sandbox769ee9e314274e438a0ab83e38092df2>.mailgun.org:d2ef2139b9af256b775d1027f05b9bbcsmtp.mailgun.org:25';

  //Limits accounts to NUIG email addresses.
  Accounts.config({restrictCreationByEmailDomain: 'nuigalway.ie'}) ;

//  Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false});

process.env.MAIL_URL = "smtp://postmaster%40postmaster@sandbox6a9174e783f245fb9e4e109bed3b86e6.mailgun.org.mailgun.org:5bd462ef0f7f8f8760c018e62b31b921@smtp.mailgun.org:587";

});

Avatar.setOptions({
  gravatarDefault: "retro"
});


Meteor.methods({
  'insertPost':function(post){
    Posts.insert(
      {
        post:post,
        date: new Date(),
        createdBy: Meteor.userId(),
        likes:{
          totalLikes:0,
          users:[]
        },
        dislikes:{
          users:[]
        },
      },
      function( error, result){
        if(error) console.log(error);
        if(result) console.log(result);
      }
    );
  },

  'insertTip':function(tip){
    Tips.insert(
      {
        tip:tip,
        date: new Date(),
        createdBy: Meteor.userId(),

      },
      function( error, result){
        if(error) console.log(error);
        if(result) console.log(result);
      }
    );
  },



  'likePost' : function(postId){
    //If user is in dislike collection, pop them from that and inc likes by two
      var update = true;
      Posts.update(
        {_id:postId},
        {$addToSet: {"likes.users":Meteor.userId()}}
      ), function(error,result){
        if(error)
        {
          //user has already liked this post
          update = false;
        }
        if(result)
        {
          //Increment counter if user likes it
          update = true;
        }
      };

      if(update){
        Posts.update({_id:postId},
        {$inc : {"likes.totalLikes": 1}}),
        function(error, result){
          if(error) console.log(error);
          if(result) console.log(result);
        };
      }
    },
    'unlikePost' : function(postId){
      Posts.update({_id:postId},
      {$inc : {"likes.totalLikes":-1}}),
      function(error, result){
        if(error) console.log(error);
        if(result) console.log(result);
      };
      Posts.update(
        {_id:postId},
        {$pop: {"likes.users":Meteor.userId()}}
      ), function(error,result){
        if(error) console.log(error);
        if(result) console.log(result);
      };
    },

    'dislikePost' : function(postId){
        //If user is in likes collection, pop them from that and inc likes by minus two
        var update = true;
        Posts.update(
          {_id:postId},
          {$addToSet: {"dislikes.users":Meteor.userId()}}
        ), function(error,result){
          if(error)
          {
            //user has already disliked this post
            update = false;
          }
          if(result)
          {
            //Decrement counter if user dislikes it
            update = true;
          }
        };

        if(update){
          Posts.update({_id:postId},
          {$inc : {"likes.totalLikes": -1}}),
          function(error, result){
            if(error) console.log(error);
            if(result) console.log(result);
          };
        }
      },
      'relikePost' : function(postId){
        Posts.update({_id:postId},
        {$inc : {"likes.totalLikes":1}}),
        function(error, result){
          if(error) console.log(error);
          if(result) console.log(result);
      };
      Posts.update(
        {_id:postId},
        {$pop: {"dislikes.users":Meteor.userId()}}
      ), function(error,result){
        if(error) console.log(error);
        if(result) console.log(result);
      };
  },
  'deletePost' : function(postId){
    Posts.remove(postId);
  },

  'updatePost' : function(postId){
    Posts.update({_id:postId.id}, {$set: {post: postId.post}});
  },
  'updateTip' : function(tipObj){
    Tips.update({_id:tipObj.id}, {$set: {tip: tipObj.tip}});
  }


});

Meteor.publish('userPosts', function(){
  return Posts.find();
});
Meteor.publish('newsPosts', function(){
	return News.find();
});

Meteor.publish('userTips', function(){
	return Tips.find();
});

Meteor.settings.contactForm = {
  emailTo: 'naoisecallery2@gmail.com'
};
