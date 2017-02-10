import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Meteor.subscribe('userMessages');

Template.data.helpers({
  messages : function (){
    return Messages.find();
  }
});

Template.data.events({
  'click #delete' : function(event, instance) {
    // Remove the vehicle with current id
    Messages.remove(this._id)
  }
});

Template.data.events({
  'submit.addDataForm' : function(event, instance){
    event.preventDefault();
    Messages.insert({name:event.target.name.value,
      message:event.target.model.value});
  }
});

Template.data.helpers({
  loggedIn:function(){
    return !!Meteor.user();
  }
});
