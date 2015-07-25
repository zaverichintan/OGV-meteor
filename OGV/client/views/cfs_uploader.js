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
	fsFile.commentsCount = 0;
	fsFile.viewsCount = 0;
	var currentUser = Meteor.user();

	ModelFiles.insert(fsFile,function(err,fileObj) {
	    if (err) {
		throwError("There was some error in uploading your file, please try again/later");
	     } else {
		throwNotification("File Uploaded, and will appear in file manager after it's converted"); 
		/*sAlert.error("Upload .g or .obj file only");
	    } else {
	    sAlert.info("File Uploaded, and will appear in file manager after it's converted", {effect: 'flip', onRouteClose: false, stack: false, timeout: 4000, position: 'top'});*/
		Router.go("/description/" +fileObj._id);  
	    }
	});

    Meteor.users.update(currentUser._id, {$inc:{"profile.countModels": 1}}, function(error, res) {
		if (error) {
			throwError(error.reason);
		} else {
		throwNotification("Updated number of models for user");
		}
	});

    });

}
