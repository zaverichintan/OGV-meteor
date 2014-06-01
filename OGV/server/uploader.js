Meteor.methods({
    saveFile: function(blob, name, uploadPath, encoding) 
    {
	var uploadPath = cleanPath(uploadPath),
	    fs = Npm.require('fs'),
	    path = Npm.require('path'),
	    name = cleanName(name || 'file'),
	    ext = path.extname(name),
	    encoding = encoding || 'binary',
	    appRoot = process.env.PWD+'/private/',
	    userId = Meteor.userId(),
	    uploadPath = appRoot + userId + '/';
	
	console.log(ext);   
	if (!fs.existsSync(uploadPath)) {
	    console.log("now creating directory");
	    fs.mkdirSync(path);
	}

	if (ext == '.obj') {	
	    fs.writeFile(uploadPath + name, blob, encoding, function(err) 
	    {
	        if (err) {
	            throw (new Meteor.Error(500, 'Failed to save file.', err));
	        } else {
		   info = 'The file' + name + '(' + encoding + ') was saved to' + uploadPath;
	        }
	    });
         } else {
	     info = 'File type not supported';
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
	return info;	
    }
});
    
