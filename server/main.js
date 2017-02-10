import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('allMessages', function(){
    return Messages.find();
});

Meteor.methods({
  'createMessage': function(messageObj){
    Messages.insert({
      name: messageObj.name,
      message: messageObj.message,
    //  createdBy: Meteor.userID()
    });
  }
});

Meteor.methods({
    'deleteMessage': function(_Id){
        Messages.remove(_Id);
    }
});
