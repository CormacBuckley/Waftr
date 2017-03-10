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
