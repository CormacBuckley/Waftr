Meteor.publish('allNewsPosts', function(){
  return NewsPosts.find();
});

Meteor.publish('singleNewsPosts', function(id){
  return NewsPosts.find(id);
});
