Meteor.methods({
    insertFile:function(file)
    {
	console.log("file being inserted");
	file.owner = Meteor.userId();
	console.log(file.owner);
	var ext = file.extension();
	var existingFile = ModelFiles.findOne({'original.name':file.name()});
	/** Check if file already exists */
	if (existingFile) {
	    throw (new Meteor.Error(409, 'File Already Exists'));
	
	/** Don't allow any file other than obj */
	} else if (ext != 'obj'){
	    throw (new Meteor.Error(503, 'File type not supported'));
	
	/** 
	 * If file extension is fine and file doesn't already
	 * exists then insert the model file into collection
	 */
	} else {
	    ModelFiles.insert(file, function(err,fileObj) {
		if (err) {
	            console.log(err);
		    throw (new Meteor.Error(503, err.message));
		}
	    });
	}

    }
});
