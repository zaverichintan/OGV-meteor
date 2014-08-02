Router.configure({
    layoutTemplate:'layout',
    loadingTemplate:'preloader',
    waitOn: function() { return Meteor.subscribe('modelFiles'); }
});

Router.map(function() {
    this.route('index', {path : '/'});
    this.route('signUp', {path : 'sign-up'});
    this.route('logIn', {path : 'log-in'});
    this.route('cfsUploader', {path : 'upload'});
    this.route('notVerified', {path : 'not-verified'});
    this.route('forgotPassword', {path : 'forgot-password'});
    this.route('filemanager', {path : 'filemanager'});
    this.route('dashboard',{path: 'dashboard'});
    this.route('modelViewer', {
	path: '/models/:_id',
	data: function() 
	{ 
	    return ModelFiles.findOne (this.params._id);
	},
	action : function () {
   if (this.ready()) this.render();
}
    });

    this.route('modelMeta', {
	path: '/description/:_id',
	data: function() 
	{
	    return ModelFiles.findOne(this.params._id);
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
    } else if (Meteor.loggingIn()) {
	this.render('preloader');
    } else {
	this.render('logIn');
    }
    pause();
}


var loggingIn = function(pause) {
    if (Meteor.loggingIn()) {
	this.render('preloader');
    }
    else {
	this.render();
    }
    pause();
}


Router.onBeforeAction(validateUser,{only:['cfsUploader','filemanager','dashboard','modelMeta']});
