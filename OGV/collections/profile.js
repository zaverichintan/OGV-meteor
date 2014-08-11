ProfilePictures = new FS.Collection('profilePictures',  {
    stores: [
	new FS.Store.FileSystem("profilePictures")
    ]
});


ProfilePictures.allow({
    insert: function(userId, file) 
    {
	if (file.extension() == 'jpg') {	
	    return true;
	} else {
	    throw ( new Meteor.Error(550, "Only .jpg files are allowed"));
	    return false;
	}
    },
    update: function(userId,file) 
    {
	return !! userId;
    },
    download: function(userId, file) 
    {
    	return true;
    }	
});
