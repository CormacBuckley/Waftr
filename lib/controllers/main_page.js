MainPageController = BaseController.extend({
  template: 'NewsPostsList',

  findOptions: function() {
    return { sort: {createdAt: -1}};
  },

  waitOn: function() {
    return Meteor.subscribe('allNewsPosts', this.findOptions());
  },
  data: function(){
    return { NewsPosts: NewsPosts.find({}, this.findOptions()) };
  }
});
