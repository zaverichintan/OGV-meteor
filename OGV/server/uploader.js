Meteor.methods({
    saveFile: function(blob, name, uploadPath, encoding) 
    {
	var uploadPath = cleanPath(uploadPath),
	    fs = Npm.require('fs'),
	    path = Npm.require('path'),
	    name = cleanName(name || 'file'),
	    ext = path.extname(name),
	    encoding = encoding || 'binary',
	    appRoot = process.env.PWD,
	    userId = Meteor.userId(),
	    fileUploaded = false;
	    uploadPath = appRoot + userId + '/';	
		console.log(uploadPath);
		console.log(appRoot);
	if (ext == '.obj') {
	    if (!fs.existsSync(uploadPath)) {
		fs.mkdirSync(uploadPath);
		fs.writeFileSync(uploadPath + name, blob, encoding);
		fileUploaded = true;
	    } else if (fs.existsSync(uploadPath + name)) {
	    	throw (new Meteor.Error(409, 'File Already Exists'));
	    } else {
		fs.writeFileSync(uploadPath + name, blob, encoding);
		fileUploaded = true;
	    }	
         } else {
	     throw (new Meteor.Error (409,'File type not supported'));
	 }	
	
	if (fileUploaded) {
	    var model = {
	    	name: name,
	    	userId: userId,
	  	lovemeter: 13
	    }
	    model._id = Models.insert(model);
	}

	function cleanPath(str) 
	{
	    if (str) {
		return str.replace(/\.\./g,'').replace(/\/+/g,'').replace(/^\/+/,'').replace(/\/+$/,'');
	    }
	}

	function cleanName(str) 
	{
	    return str.replace(/\.\./g,'').replace(/\//g,'');
	}	
    }
});
    
