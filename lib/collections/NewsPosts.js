NewsPosts = new Mongo.Collection('NewsPosts');

/*Posts.allow({
	insert: function(userId, doc) {
		return !!userId;
	}
});*/

NewsPostsFields = new SimpleSchema({
  title: {
    type: String,
		label: 'Title'
	},
	body: {
		type: String,
		label: "Body",
		autoform: {
			type: 'textarea',
			rows: 5
		}
	},
	_id: {
		type: String,
		optional: true,
		autoform: {
			omit: true
		}
	},
	author: {
		type: String,
		label: "Author",
		autoValue: function(){
			return Meteor.userId()
		},
		autoform: {
			type: "hidden"
		}
	},
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			return new Date()
		},
		autoform: {
			type: "hidden"
		}
	}
});

NewsPosts.attachSchema( NewsPostsFields );
