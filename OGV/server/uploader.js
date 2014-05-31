Meteor.methods({
    saveFile: function(blob, name, path, encoding) 
    {
	var path = cleanPath(path),
	    fs = Npm.require('fs'),
	    name = cleanName(name || 'file'),
	    encoding = encoding || 'binary',
	    appRoot = process.env.PWD+'/private/',
	    userId = Meteor.userId(),
	    path = appRoot + userId + '/';
	    
	if (!fs.existsSync(path))
	{
		console.log("now creating directory");
		fs.mkdirSync(path);
	}
	
	
	fs.writeFile(path + name, blob, encoding, function(err) 
	{
	    if (err) {
	        throw (new Meteor.Error(500, 'Failed to save file.', err));
	    } else {
		console.log('The file' + name + '(' + encoding + ') was saved to' + path);
	    }
	});

	function cleanPath(str) {
	    if (str) {
		return str.replace(/\.\./g,'').replace(/\/+/g,'').replace(/^\/+/,'').replace(/\/+$/,'');
	    }
	}

	function cleanName(str) {
	    return str.replace(/\.\./g,'').replace(/\//g,'');
	}
    }
});
    
