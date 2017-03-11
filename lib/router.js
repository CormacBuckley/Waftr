Router.configure({
  loadingTemplate: 'spinner',
  notFoundTemplate: 'notFound',
});

Router.route('/', {
  name: 'root',
  controller: 'MainPageController',
});

Router.route('/new', {
  name: 'newNewsPosts',
  controller: 'BaseController',
});

Router.route('/collegelife',{
	name: 'collegelife',
	controller: 'BaseController',
});

Router.route('/tips',{
	name: 'tips',
	controller: 'BaseController',
});

Router.route('/firstyear',{
	name: 'firstyear',
	controller: 'BaseController',
});

Router.route('/events', {
  name: 'events',
  controller: 'BaseController',
});
Router.route('/talk', {
  name: 'talk',
  controller: 'BaseController',
});
Router.route('/contact', {
  name: 'contact',
  controller: 'BaseController',
});
Router.route('/about', {
  name: 'about',
  controller: 'BaseController',
});

Router.route('/:_id', {
  name: 'singleNewsPosts',
  controller: 'SingleNewsPostsController',
});

Router.onBeforeAction(function () {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
},

{
  only: 'newNewsPosts',
});
