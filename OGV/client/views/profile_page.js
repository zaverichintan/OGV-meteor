Template.profilePage.events({
	'click #followButton': function(e, t){
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
		Meteor.users.update({_id: otherId}, {$addToSet: {"profile.follower": currentUser._id}}, function(error, res) {
		    if (error) {
			throwError(error.reason);
		    } else {
			throwNotification("Updated your followers' list");
		    }
		});

		document.getElementById("unfollowButton").style.display="block";
		document.getElementById("followButton").style.display="none";
	}, 

	'click #unfollowButton': function(e, t){
		var parts = location.href.split('/');
		var otherId = parts.pop(); //id of user whose page is being visited
		var currentUser = Meteor.user(); //user who is using OGV at that moment

		Meteor.users.update(currentUser._id, {$pull: { "profile.following": otherId }}, function(error, res) {
		    if (error) {
			throwError(error.reason);
		    } else {
			throwNotification("Updated your following list");
		    }
		});		

		document.getElementById("unfollowButton").style.display="none";
		document.getElementById("followButton").style.display="block";

	}
});