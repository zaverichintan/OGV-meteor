Template.modelMeta.events({
    'submit #uploader-form': function(e, t)
    {
	e.preventDefault();
	
	var modelMetaForm = $(e.currentTarget),
	    filename = modelMetaForm.find('#desc-filename').val().toLowerCase(),
	    description = modelMetaForm.find('#desc-about').val(),
	    thumbnail,
	    modelId = modelMetaForm.find('#model-id').val();
	    
	file = $('#desc-model-thumb')
	
	var fsFile = new FS.File(e.target[2].files[0]);
	fsFile.gFile = modelId;
	
	ThumbFiles.insert(fsFile,function(err,thumbFile) {
	    if (err) {
		throwError(err.reason);
	    } else {
		throwNotification("Image has been Uploaded" );
		ModelFiles.update(modelId, {$set: {name: filename, about: description, thumbnail:thumbFile._id}}, function(error, res) {
		    if (error) {
			throwError(error.reason);
		    } else {
			throwNotification("Data about model has been saved");
		    }
		});
  
	    }
	}); 
    } 
});
