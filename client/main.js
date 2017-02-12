import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Meteor.subscribe('userPosts');

Template.posts.helpers({
  charsRemaining: function(){
    return Session.get('charsRemaining');
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

Template.data.helpers({
  loggedIn:function(){
    return !!Meteor.user();
  }
});*/
