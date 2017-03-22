import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // code to run on server at startup
});

Avatar.setOptions({
  customImageProperty: function() {
    var user = this;
    user.profileImageUrl  = "eamon.jpg";
    return user.profileImageUrl;
  }
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
        likes:{
          totalLikes:0,
          users:[]
        },
        retweets:{
          totalRetweets:0,
          users:[]
        }
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

  'updatePost' : function(postObj){
    Posts.update({_id:postObj.id}, {$set: {post: postObj.post}});
  }

});

Meteor.publish('userPosts', function(){
  return Posts.find();
});
Meteor.publish('newsPosts', function(){
	return News.find();
});

Meteor.publish('tipsPosts', function(){
	return Tips.find();
});

Meteor.settings.contactForm = {
  emailTo: 'naoisecallery2@gmail.com'
};
