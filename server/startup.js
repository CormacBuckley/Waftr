function setGravatars() {
  let users = Meteor.users.find( { md5hash: { $exists: false } } );
  users.forEach( ( user ) => {
    Meteor.users.update( { _id: user._id }, {
      $set: { md5hash: Gravatar.hash( user.emails[0].address ) }
    });
  });
}

Meteor.startup( () => setGravatars() );
