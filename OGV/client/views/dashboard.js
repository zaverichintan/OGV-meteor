Template.dashboard.events({
    'submit #dash-user-form' : function(e, t) 
    {
	e.preventDefault();

	var userDash = $(e.currentTarget),
	    userBio = userDash.find('#dash-short-bio').val(),
	    userName = userDash.find('#dash-username').val();

	console.log(userBio);	
	userImageFile = $('#dash-user-pic');

	var currentUser = Meteor.user();
	console.log(e.target[2].files[0]);
	var fsFile = new FS.File(e.target[2].files[0]);
	console.log(fsFile);
	fsFile.user = currentUser._id;
	
	ProfilePictures.insert(fsFile, function(err, dpFile) {
	    if (err) {
		Session.set('alert',err.reason);
	    } else {
		Session.set('alert','profile pic uploaded');
		console.log(dpFile);
	        Meteor.users.update( currentUser._id,{ $set: {profile: {bio : userBio, name : userName, pic: dpFile._id} }}, function(error, res) {
	   	     if (error) {
			console.log(error);
	    	    } else {
			console.log("update errors");
		    }
		});
	     
	    }
	});
    }
});

Template.dashboard.helpers({
    profilePic : function() 
    {
	var picId = Meteor.user().profile.pic;
	console.log(picId);	
	return ProfilePictures.findOne(picId).url();
    }
});
	
  

