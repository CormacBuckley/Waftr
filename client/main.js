import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Meteor.subscribe('allMessages');

Template.data.helpers({
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
});
