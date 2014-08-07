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
    Session.set("alert","");
    
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
		Session.set('alert', err.reason);
	     } else {
		Session.set('alert', "File Uploaded, and will appear in file manager after it's converted" ); 
		Router.go("/description/" +fileObj._id);  
	    }
	});

    });

}
