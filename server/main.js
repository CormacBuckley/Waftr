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
  'likePost' : function(postID){
      Posts.update({_id:postID},
      {$inc : {"likes.totalLikes":1}}),
      function(error, result){
        if(error) console.log(error);
        if(result) console.log(result);
      };
      Posts.update(
        {_id:postId},
        {$addToSet: {"likes.users":this.userId}}
      ), function(error,result){
        if(error) console.log(error);
        if(result) console.log(result);
      };
    },
  'unlikePost' : function(postID){
    Posts.update({_id:postID},
    {$inc : {"likes.totalLikes":-1}}),
    function(error, result){
      if(error) console.log(error);
      if(result) console.log(result);
    };
    Posts.update(
      {_id:postId},
      {$pop: {"likes.users":this.userId}}
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
