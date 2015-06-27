Template.profilePage.events({
	'click #followButton': function(e, t)
	{
		var parts = location.href.split('/');
		var otherId = parts.pop(); //id of user whose page is being visited
		var currentUser = Meteor.user(); //user who is using OGV at that moment		
		
		//updates "following" array of currentUser
		Meteor.users.update(currentUser._id, {$addToSet: {"profile.following": otherId}}, function(error, res) {
		    if (error) {
			throwError(error.reason);
		    } else {
			throwNotification("Updated your following list");
		    }
		});

		//updates "follower" array of other user 
		/***PROBLEM***/
		Meteor.users.update(otherId, {$addToSet: {"profile.follower": currentUser._id}}, function(error, res) {
		    if (error) {
			throwError(error.reason);
		    } else {
			throwNotification("Updated your followers' list");
		    }
		});

		document.getElementById("followButton").style.display="none";
        document.getElementById("unfollowButton").style.display="block";
	}, 

	'click #unfollowButton': function(e, t)
	{
		var parts = location.href.split('/');
		//id of user whose page is being visited
		var otherId = parts.pop(); 
		
		var currentUser = Meteor.user(); //user who is using OGV at that moment

		Meteor.users.update(currentUser._id, {$pull: { "profile.following": otherId }}, function(error, res) {
		    if (error) {
			throwError(error.reason);
		    } else {
			throwNotification("Updated your following list");
		    }
		});		

		//updates "follower" array of other user 
		/***PROBLEM***/
		Meteor.users.update(otherId, {$pull: {"profile.following": currentUser._id}}, function(error, res) {
		    if (error) {
			throwError(error.reason);
		    } else {
			throwNotification("Updated your followers' list");
		    }
		});

		document.getElementById("followButton").style.display="block";
        document.getElementById("unfollowButton").style.display="none";
	}
});


Template.profilePage.helpers({
    /**
     * returns image of the user from database, if there's no image a default
     * image is shown.
     */
    userImg: function() 
    {
	var parts = location.href.split('/');
	var otherId = parts.pop(); //id of user whose page is being visited
	var currentProfile = Meteor.users.findOne(otherId);
	var picId = currentProfile.profile.pic;
	if( picId == false ){
		return "/public/icons/User.png";
	} else {
		return ProfilePictures.findOne(picId).url();
	}
    }, 
    
    /**
     * Returns the number of people the user (whose profile is being viewed 
     * currently) is following.
     */
    followingCount: function()
    {
    var parts = location.href.split('/');
	//id of user whose page is being visited
	var otherId = parts.pop(); 
	var currentProfile = Meteor.users.findOne(otherId);

	var followings = currentProfile.profile.following;
	return followings.length;
    },
    
    /**
     * Returns the number of people the user (whose profile is being viewed 
     * currently) is bring followed by.
     */
    followerCount: function()
    {
	var parts = location.href.split('/');
	var otherId = parts.pop(); //id of user whose page is being visited
	var currentProfile = Meteor.users.findOne(otherId);

	var followers = currentProfile.profile.follower;
	return followers.length;    	
    }
});


Template.profileModelFeed.helpers({
    /**
     * models helper finds all the models from the user and then sorts
     * them in reverse chronological order. 
     */
    models: function() 
    {
    var parts = location.href.split('/');
	var urlId = parts.pop(); //id of user whose page is being visited
	
	model = ModelFiles.find({owner: urlId}, {sort:{timeUploaded:-1}});
	if (model.count()) {
	    return model;
	} else {
	    return false;
	} 
    },
    
    /**
     * Returns user details for the profile being viewed currently
     */
    user: function()
    {
    var parts = location.href.split('/');
	var urlId = parts.pop(); //id of user whose page is being visited	
    return Meteor.users.findOne(urlId);
    }
}); 