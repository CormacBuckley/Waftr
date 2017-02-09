import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Meteor.subscribe('userVehicles');

Template.data.helpers({
  vehicles : function (){
    return Vehicles.find();
  }
});

Template.data.events({
  'click #delete' : function(event, instance) {
    // Remove the vehicle with current id
    Vehicles.remove(this._id)
  }
});

Template.data.events({
  'submit.addDataForm' : function(event, instance){
    event.preventDefault();
    Vehicles.insert({make:event.target.make.value,
      model:event.target.model.value,
      year:event.target.year.value,
      mileage:event.target.mileage.value});
  }
});
