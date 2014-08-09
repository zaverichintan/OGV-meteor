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
		throwError(err.reason);
	    } else {
		Session.set('alert','profile pic uploaded');
		console.log(dpFile);
	        Meteor.users.update( currentUser._id,{ $set: {profile: {bio : userBio, name : userName, pic: dpFile._id} }}, function(error, res) {
	   	     if (error) {
			throwError(error.reason);
	    	    } else {
			console.log("update errors");
		    }
		});
	     
	    }
	});
    },
    'submit #dash-admin-form' : function(e,t) 
    {
	e.preventDefault();
	
	var adminDash = $(e.currentTarget),
	    primaryBranding = adminDash.find('#dash-primary-branding').val(),
	    mailUrl = adminDash.find ('#dash-mail-url').val(),
	    mgedPath = adminDash.find('#dash-mged-path').val(),
	    gobjPath = adminDash.find('#dash-g-obj-path').val();
	
	settings = OgvSettings.findOne();
	OgvSettings.update( settings._id, { $set: { siteName: primaryBranding, mailUrl : mailUrl, mgedPath : mgedPath, gobjPath :gobjPath }});	
    }
});

Template.dashboard.helpers({
    profilePic : function() 
    {
	var picId = Meteor.user().profile.pic;
	console.log(picId);	
	return ProfilePictures.findOne(picId).url();
    },
    settings: function() 
    {
	return OgvSettings.findOne();
    }
});
	
  

