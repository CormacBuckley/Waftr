import { Template } from 'meteor/templating';

Meteor.subscribe('newsPosts');
import './news.html';
import './tasks.js';

Template.news.helpers({
	news() {
           return News.find({}, { sort: { createdAt: -1 } });
     },
});


Template.news.events({
  'submit .new-post'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a task into the collection
    News.insert({
      text,
      //createdAt: new Date(), // current time
    });

    // Clear form
    target.text.value = '';
  },
});
