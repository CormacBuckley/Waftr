Posts = new Mongo.Collection('posts');

Posts.allow({
  insert : function(userId, doc){
    return !!userId;
  }
})

PostSchema = new SimpleSchema({
  body:{
    type: String,
    label: "Post"
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

Posts.attachSchema(PostSchema);
