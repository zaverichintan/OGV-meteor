Meteor.methods({
    saveFile: function(blob, name, path, encoding) 
    {
	var path = cleanPath(path),
	    fs = Npm.require('fs'),
	    name = cleanName(name || 'file'),
	    encoding = encoding || 'binary',
	    chroot = process.env.PWD+'/private/';
	    console.log(chroot);
	    path = chroot;
	    console.log("path"+path);
	    console.log(name);

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
    
