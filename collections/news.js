News = new Mongo.Collection('news');

News.allow({
	insert: function(userId, doc) {
		return !!userId;
	}
});

NewsSchema = new SimpleSchema({
	headline: {
		type: String,
		label: "Headline"
	},
	content: {
		type: String,
		label: "Content"
	},
	author: {
		type: String,
		label: "Author",
		autoValue: function(){
			return this.userId
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

News.attachSchema( NewsSchema );
