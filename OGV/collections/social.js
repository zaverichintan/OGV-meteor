Comments = new Meteor.Collection('comments');
Lovers = new Meteor.Collection('lovers');

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
    },
    

    love: function(loveAttributes){
	var lovers = [];
	var alreadyLoved = false;
	var user = Meteor.user();
	lovers.push(user._id);
        
	var post = ModelFiles.findOne(loveAttributes.postId);
	var loversObj = Lovers.findOne({postId: loveAttributes.postId});

	if (!user) {
	    throw new Meteor.Error(401, "You need to login to love post");
	}
        
	if (!post) {
	    throw new Meteor.Error(422, 'You must love a post');
	}
       
        
	if (loversObj) {
	    loversArray = loversObj.lovers;
 	    
	    for (l in loversArray) {
		if (loversArray[l] == user._id) {
		    alreadyLoved = true;
		} 
	    }

            if(alreadyLoved) {  
                throw (new Meteor.Error(550,"you already love this"));
	    } else {
		loversArray.push(user._id);
		return Lovers.update({postId: loveAttributes.postId},{$set: {lovers: loversArray}}); // update lovers
            }

        } else {
	    love = _.extend(_.pick(loveAttributes, 'postId'), {
		lovers: lovers,
		submitted: new Date().getTime()
	    });

	    return Lovers.insert(love);
        }
    }
});
