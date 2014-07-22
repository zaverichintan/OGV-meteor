gStore = new FS.Store.FileSystem("modelFiles", {
    transformWrite: function(fileObj, readStream, writeStream)
    {
	console.log("transform writing");
	var fileId = fileObj._id;
	Meteor.call('convertFile', fileId, function(err) {
	     if (err) {
		console.log("convertFileError");
		console.log(err);
 	    } else {
		Session.set("alert","File has been converted");
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

ModelFiles = new FS.Collection("modelFiles", {
    stores: [ gStore ]
});

  
