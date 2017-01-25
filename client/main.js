import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
 this.decrement = new ReactiveVar(0);
 this.both = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  decrement() {
    return Template.instance().decrement.get();
  },
  both() {
    return Template.instance().both.get();
  },
});

Template.hello.events({
  'click .bt1'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },

	'click .bt2'(event, instance) {
    // increment the counter when button is clicked
    instance.decrement.set(instance.decrement.get() - 1);
  },

		'click .bt3'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
	instance.decrement.set(instance.decrement.get() - 1);
	 instance.both.set(instance.both.get() + 1);

  },
});
