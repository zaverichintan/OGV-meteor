Meteor.Router.add({
    '/' : 'main',
    '/forgot-password' : 'forgotPassword',
    '/log-in' : 'logIn',
    '/sign-up' : 'signUp',
    '/upload' : 'uploader',
    '/not-verified' : 'notVerified',
    '/preloader' : 'preloader',
    '/filemanager': 'filemanager' 
});

Meteor.Router.filters({
    'checkLoggedIn': function(page) 
    {
	if (Meteor.user()) {
	    return page;
	} else {
	    return 'logIn';
	}
    },
    'checkEmailVerified': function(page) 
    {
	if (Meteor.loggingIn()) {
	    return 'preloader';
	} else if (Meteor.user()) {
	    if (Meteor.user().emails[0].verified) {	
		return page;
	    } else {
		return 'notVerified';
	    }
	} else {
	    return 'logIn';
	}
    }
});
Meteor.Router.filter('checkEmailVerified', {only: ['main','uploader','filemanager']});

