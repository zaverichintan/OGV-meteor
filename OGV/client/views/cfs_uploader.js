Template.cfsUploader.events({
    'change #fileInput':function(event,temp)
    {
	FS.Utility.eachFile(event, function(file)
	{
	    var fsFile = new FS.File(file);
	    console.log(fsFile.name());
	    console.log(fsFile.extension());
	    Meteor.call('insertFile', fsFile, function(err) {
		if (err) {
		    Session.set('alert',err.message);
		} else {
		    Session.set('alert', 'Yay! File Uploaded');
		} 
	    });
	});
    }
});	
