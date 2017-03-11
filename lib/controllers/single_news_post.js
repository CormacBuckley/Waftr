SingleNewsPostsController = BaseController.extend({
  template: 'NewsPostsPage',

  waitOn: function(){
    return Meteor.subscribe('singleNewsPosts', this.params._id);
  },

  data: function() {
    return NewsPosts.findOne(this.params._id);
  }
});
