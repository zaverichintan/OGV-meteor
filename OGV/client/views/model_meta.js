/*                     M O D E L _ M E T A . J S
 * BRL-CAD
 *
 * Copyright (c) 1995-2013 United States Government as represented by
 * the U.S. Army Research Laboratory.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public License
 * version 2.1 as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this file; see the file named COPYING for more
 * information.
 */

/**
 * @file OGV/client/views/model_meta.js
 *
 * Helpers and events for editing models.
 */

/**
 * Update information about model
 *
 * Each model has some information associated with it, it can be name
 * bio or a representative image. Whenever user uploads he gets an option
 * to edit this information.
 */

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
		sAlert.error("No image or invalid image format selected", {effect: 'flip', onRouteClose: false, stack: false, timeout: 8000, position: 'top'});
	    } else {
		sAlert.success("Image has been Uploaded", {effect: 'flip', onRouteClose: false, stack: false, timeout: 4000, position: 'top'});		
		ModelFiles.update(modelId, {$set: {name: filename, about: description, thumbnail:thumbFile._id}}, function(error, res) {
		    if (error) {
			sAlert.error(error.reason);
		    } else {
			sAlert.success("Data about model has been saved", {effect: 'flip', onRouteClose: false, stack: false, timeout: 4000, position: 'top'});
		    }
		});
  
	    }
	}); 
    } 
});
