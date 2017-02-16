import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Meteor.subscribe('userPosts');

Template.posts.helpers({
  charsRemaining: function(){
    return Session.get('charsRemaining');
  },
  posts:function(){
    return Posts.find({},{sort: {date:-1}});
  },
  timeDiff:function(postDate){
    // Subtract current time from time of post to get the difference
    var timeDiff = new Date().getTime() - postDate.getTime();
    var diffDays = Math.floor(timeDiff / (1000*360*24));
    var diffHours = Math.floor(timeDiff / (1000*3600));
    var diffMins = Math.floor(timeDiff / (1000*60));
    var diffSecs = Math.floor(timeDiff / (1000));

    if(diffDays > 0)
    return (diffDays + "d ago");
    else if (diffHours > 0)
    return (diffHours + "h ago");
    else if (diffMins > 0)
    return (diffMins + "m ago");
    else if (diffSecs > 0)
    return (diffSecs + "s ago");
    else
    return ("Just now")
  },
  checked:function(users){
    if($.inArray(Meteor.userId(), users) > -1)
    return true;
    else
      return false;
  },
  userCreated: function(createdBy){
    if(createdBy == Meteor.userId())
    return true;
    else
      return false;

  }
});



Template.posts.onRendered(function(){
  $("#postForm").validate();
});

Template.posts.events({
  'keyup #inputPost': function(event){
    //Retrieve the contents from the Textarea
    var inputText = event.target.value;
    Session.set("charsRemaining", (140-inputText.length) + " characters remaining");
  },
  'submit #postForm': function(event){
    event.preventDefault();
    var post = event.target.inputPost.value;
    //Clearing the textarea contents
    event.target.reset();
    Session.set("charsRemaining", 140 + "characters remaining");
    Meteor.call('insertPost', post);
  },
  'click .likeBox input' : function (event){
    if(event.toElement.checked){
      Meteor.call('likePost', this._id);
    }
    else {
      Meteor.call('unlikePost', this._id);
    }
  },
  'click .editBox input' : function(event){
    if(event.toElement.checked)
    {
      $('#edit' + this._id).removeClass('hidden');
      $('#post' + this._id).hide();
    }
    else {
      var post = $('#edit' + this._id).val();
      Meteor.call('updatePost', {id :this._id, post:post});
      $('#edit'+ this._id).addClass('hidden');
      $('#post' + this._id).show();
    }
  },
  'click .deleteBox input' : function(event, instance){
    Meteor.call('deletePost', this._id)
  }
});

/*Template.data.helpers({
  messages : function (){
    return Messages.find();
  }
});

Template.data.events({
  'click #delete' : function(event, instance) {
    // Remove the vehicle with current id
    Meteor.call('deleteMessage', this._id)
  }
});

Template.data.events({
  'submit.addDataForm' : function(event, instance){
    event.preventDefault();
    Meteor.call('createMessage',{name:event.target.name.value,
      message:event.target.model.value
  });
  }
});
*/
Template.posts.helpers({
  loggedIn:function(){
    return !!Meteor.user();
  }
});
