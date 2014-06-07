/**
 * Checks if the file is text or binary and then encode it accordingly
 */
Meteor.saveFile = function(blob,name,path, type)
{ 
    var fileReader = new FileReader(), 
	method, encoding = 'binary', type = type || 'binary'; 
    switch (type) { 
	case 'text': 
	   method = 'readAsText'; 
	   encoding = 'utf8' 
	break; 
              
	case 'binary': 
	    method = 'readAsBinaryString'; 
	    encoding = 'binary'; 
	break;
              
	default:
	    method = 'readAsBinaryString';
	    encoding = 'binary';
	break;
    }

    fileReader.onload = function(file) {
	Meteor.call('saveFile', file.srcElement.result, name, path, encoding, function(err) { 
	    if (err) {
		Session.set('alert','Sorry,' + err);
	    }
	    else {
		Session.set('alert','Yay! file uploaded');
		Meteor.Router.to('/render');
	    }
	});
    }
        
    fileReader[method](blob);
}

/**
 * Whenever the input changes, save the file by calling saveFile function 
 * from uploader.js from server
 */

Template.uploader.events({ 
    'change input': function(ev) {
	_.each(ev.currentTarget.files, function(file)
	{
	    Meteor.saveFile(file, file.name );
	});	
    }
}); 
