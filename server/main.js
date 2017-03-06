import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

Meteor.startup(() => {
  // code to run on server at startup
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

/*Meteor.publish('allMessages', function(){
    return Messages.find();
});

Meteor.methods({
  'createMessage': function(messageObj){
    Messages.insert({
      name: messageObj.name,
      message: messageObj.message,
    //  createdBy: Meteor.userID()
    });
  }
});

Meteor.methods({
    'deleteMessage': function(_Id){
        Messages.remove(_Id);
    }
});*/
