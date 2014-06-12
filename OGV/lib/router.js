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
});

var validateUser = function(pause) {
    if (Meteor.user()) {
	if (Meteor.user().emails[0].verified) {
	    this.render();
	} else {
	    this.render('notVerified');
        }
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
