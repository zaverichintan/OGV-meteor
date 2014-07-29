Comments = new Meteor.Collection('comments');
Likes = new Meteor.Collection('likes');

Meteor.methods({
     comment: function(commentAttributes) {
	var user = Meteor.user();
	var post = ModelFiles.findOne(commentAttributes.postId);
	
	if (!user) {
	    throw new Meteor.Error(401, "You need to login to make comments");
	}
	
	if (!commentAttributes.body) {
	    throw new Meteor.Error(422, 'Please write some content');
	}	
	
	if (!post) {
	    throw new Meteor.Error(422, 'You must comment on a post');
	}
	
	comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
	    userId: user._id,
	    author: user.profile.name,
	    submitted: new Date().getTime()
        });

	return Comments.insert(comment);
    }
});
