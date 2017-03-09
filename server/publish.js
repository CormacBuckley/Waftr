Meteor.publish('News', function(){
	return News.find({author: this.userId})
})
