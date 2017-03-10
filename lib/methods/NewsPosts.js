Meteor.methods({
  submitNewsPosts: function(postnews) {

    var user = Meteor.user();
    if (!user)
      throw new Meteor.Error(401, 'You need to log in first');

    var additionalParams = {
      author: 'Author',
      createdAt: new Date(),
      userId: user._id
    }

    _.extend(postnews, additionalParams);
    postnews._id = NewsPosts.insert(postnews);

    return postnews;
  }
});
