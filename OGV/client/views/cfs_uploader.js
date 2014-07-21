Template.cfsUploader.events({
        'dropped #dropzone': function(event, temp) 
        {
	    uploadFile(event, temp);
        },

        'change #fileInput': function(event, temp)
	{
	    uploadFile(event, temp);
	}
});

function uploadFile(event, temp){
	console.log(event);
	FS.Utility.eachFile(event, function(file)
	{
	    var fileId;
	    console.log(file);
	    var fsFile = new FS.File(file);
	    fsFile.owner = Meteor.userId();
	    fsFile.converted = false;
	    
	    ModelFiles.insert(fsFile,function(err,fileObj) {
		if (err) {
		    Session.set('alert', err.reason);
		} else {
		    Session.set('alert', "File Uploaded" );   
		}
	    });

	    console.log(fileId);

	});
}
