Router.configure({
    layoutTemplate:'layout',
    loadingTemplate:'preloader',
});

Router.map(function() {
    this.route('index', {path : '/'});
    this.route('signUp', {path : 'sign-up'});
    this.route('logIn', {path : 'log-in'});
    this.route('uploader', {path : 'upload'});
    this.route('notVerified', {path : 'not-verified'});
    this.route('filemanager', {path : 'filemanager'});
    this.route('modelViewer', {
	path: '/models/:_id',
	data: function() 
	{ 
	    return Models.findOne (this.params._id);
	}
    });
});

var validateUser = function(pause) {
    if (Meteor.user()) {
	if (Meteor.user().emails[0].verified) {
	    this.render();
	} else {
	    this.render('notVerified');
        }
    } else {
	this.render('logIn');
    } 
    pause();
}

var loggingIn = function(pause) {
	if (Meteor.loggingIn()) {
	    this.render('preloader');
	}
}

Router.onBeforeAction(loggingIn);
Router.onBeforeAction(validateUser,{only:['uploader','filemanager']});
