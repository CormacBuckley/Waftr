import { Template } from 'meteor/templating';

Meteor.subscribe('newsPosts');
import './news.html';

Template.news.helpers({
	news() {
           return News.find({}, { sort: { createdAt: -1 } });
     },
});
