import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
	
	  'likePoll' : function(pollID){
      var update = true;
     

  
        Polls.update({_id:pollId},
        {$inc : {"poll2.totalLikes": 1}}),
        function(error, result){
          if(error) console.log(error);
          if(result) console.log(result);
        };
     
    },
	
	
});

Meteor.publish('userPolls', function(){
	return Polls.find();
});
