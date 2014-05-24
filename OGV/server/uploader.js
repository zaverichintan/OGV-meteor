var formidable = Npm.require('formidable');
var fs = Npm.require('fs-extra');
var http = Npm.require('http'); 
var sys = Npm.require('sys'); 
var connectHandlers, connect; 

connectHandlers = WebApp.connectHandlers;

WebApp.connectHandlers.stack.splice(0,0,{ 
    route: '/upload', 
    handle: function(req, res, next) 
    { 
	if(req.method === 'POST') { 
	    var form = new formidable.IncomingForm();
	    form.uploadDir = process.env.PWD+'/private/'; 
	    form.parse(req, function(err, fields, files) 
	    { 
		res.writeHead(200, {'content-type': 'text/plain'}); 
		res.write('received upload:\n\n');
		res.end(sys.inspect({fields: fields, files: files}));
	    });

	    form.on('end', function(fields, files) {
		var original_path = this.openedFiles[0].path;
		var new_path = process.env.PWD+'/private/'+this.openedFiles[0].name;
		fs.rename(original_path, new_path,function(err) {
		    if (err) {
			console.error(err);
		    } else {
			console.log("renamed!");
		    }
		});
	   }); 
	return; 
	}	
	res.writeHead(200, {'content-type': 'text/html'}); 
	res.end ( '<div class="alert danger"> You are somewhere you are not supposed to be. </div>' ); 
    }, 
});
 
