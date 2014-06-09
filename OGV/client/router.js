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
    'loginFilter': function(page) 
    {
	if (Meteor.loggingIn()) {
	    return 'preloader';
	} else {
	    return page;
	}
    },

    'verifyFilter':function(page)
    {    
	if (Meteor.user()) {
	    if (Meteor.user().emails[0].verified) {	
		return page;
	    } else {
		return 'notVerified';
	    }
	}
    }
});

Meteor.Router.filter('loginFilter');
Meteor.Router.filter('verifyFilter',{only:['uploader','filemanager']});
