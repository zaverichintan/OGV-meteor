Template.dashboard.events({
    'submit #dash-user-form' : function(e, t) 
    {
	e.preventDefault();

	var userDash = $(e.currentTarget),
	    userBio = userDash.find('#dash-short-bio').val(),
	    userName = userDash.find('#dash-username').val();
	    
	var currentUser = Meteor.user();

	var saveSettings = function(picId)
	{
	    if (!picId) {
		picId = currentUser.profile.pic;
	    } 
		Meteor.users.update( currentUser._id,{ $set: {profile: {bio : userBio, name : userName, pic: picId} }}, function(error, res) {
		    if (error) {
			throwError(error.reason);
	    	    } else {
			throwNotification("Settings saved");
		    }
		});
	}

	if (e.target[2].files[0]) {
	    var fsFile = new FS.File(e.target[2].files[0]);
	    console.log(fsFile);
	    fsFile.user = currentUser._id;
	
	    ProfilePictures.insert(fsFile, function(err, dpFile) {
		if (err) {
		    throwError(err.reason);
	    	} else {
		    throwNotification('Profile pic uploaded');
	    	    saveSettings(dpFile._id);
		} 
	    });
	} else {
	    saveSettings();
	}
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
	OgvSettings.update( settings._id, { 
	    $set: { 
		siteName: primaryBranding, 
		mailUrl : mailUrl, 
		mgedPath : mgedPath, 
		gobjPath :gobjPath 
	    }
	}, function(error, res) {
	    if (error) {
		throwError(error.reason);
	    } else {
		throwNotification("Admin Settings saved");
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
    },
    settings: function() 
    {
	return OgvSettings.findOne();
    }
});
	
  

