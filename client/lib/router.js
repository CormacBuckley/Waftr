Router.configure({
  loadingTemplate: 'spinner',
  notFoundTemplate: 'notFound',
});

Router.route('/', {
  name: 'root',
  controller: 'MainPageController',
});

Router.route('/new', {
  name: 'newPost',
  controller: 'BaseController',
});

Router.route('/:_id', {
  name: 'singlePost',
  controller: 'SinglePostController',
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
  only: 'newPost',
});
Router.route('/collegelife');
Router.route('/events');
Router.route('/talk');
Router.route('/about');
Router.route('/contact');
Router.route('/firstyear');
Router.route('/offers');
Router.route('/tips');
