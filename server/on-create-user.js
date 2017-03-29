Accounts.onCreateUser( ( options, user ) => {
  user.md5hash = Gravatar.hash( user.emails[0].address );
  //Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false});
  return user;
});
