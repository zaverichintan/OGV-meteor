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
