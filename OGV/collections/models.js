gStore = new FS.Store.FileSystem("modelFiles", {
    transformWrite: function(fileObj, readStream, writeStream)
    {
	console.log("transform writing");
	var fileId = fileObj._id;
	Meteor.call('convertFile', fileId, function(err) {
	     if (err) {
		throwError(err.reason);
 	    } else {
		throwNotification("File has been converted");
	    }

	});
	readStream.pipe(writeStream);
    } 
});


Models = new Meteor.Collection('models');


OBJFiles = new FS.Collection ("objFiles", {
    stores: [
	new FS.Store.FileSystem("objFiles")
    ]
});

ThumbFiles = new FS.Collection ("thumbFiles", {
	stores: [
	    new FS.Store.FileSystem("thumbFiles")
	]
});


ThumbFiles.allow({
    insert: function(userId, file) 
    { 
	return !! userId;
    
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


ModelFiles = new FS.Collection("modelFiles", {
    stores: [ gStore ]
});  
