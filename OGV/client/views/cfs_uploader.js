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

function uploadFile(event, temp)
{
    
    FS.Utility.eachFile(event, function(file) {
	var fileId;
	var fsFile = new FS.File(file);
	fsFile.owner = Meteor.userId();
	fsFile.converted = false;
	fsFile.timeUploaded = new Date();
	fsFile.about = "The model " + fsFile.name() + " was uploaded on " + fsFile.timeUploaded;
	fsFile.thumbnail = new FS.File();
	fsFile.lovers = [];
	
	ModelFiles.insert(fsFile,function(err,fileObj) {
	    if (err) {
		sAlert.error(err.reason);
	    } else {
	    sAlert.info("File Uploaded, and will appear in file manager after it's converted", {effect: 'flip', onRouteClose: false, stack: false, timeout: 4000, position: 'top'}); 	
		Router.go("/description/" +fileObj._id);  
	    }
	});

    });

}
