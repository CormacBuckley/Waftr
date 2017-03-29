Accounts.onCreateUser( ( options, user ) => {
  user.md5hash = Gravatar.hash( user.emails[0].address );
  //Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false});
  //Can't get MailGun domain to go through DNS, verification won't work. 
  return user;
});
