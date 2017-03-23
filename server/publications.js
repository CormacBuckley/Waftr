Meteor.publish('allNewsPosts', function(){
  return NewsPosts.find();
});

Meteor.publish('singleNewsPosts', function(id){
  return NewsPosts.find(id);
});

Meteor.publish( 'user', function() {
  return Meteor.users.find( this.userId, {
    fields: { md5hash: 1 }
  });
});
