Meteor.Router.add({
    '/' : 'main',
    '/forgot-password' : 'forgotPassword',
    '/log-in' : 'logIn',
    '/sign-up' : 'signUp',
    '/upload' : 'uploader',
    '/not-verified' : 'notVerified',
    '/filemanager': 'filemanager' 
});

Meteor.Router.filters({
    'checkLoggedIn': function(page) 
    {
	if (Meteor.user()) {
	    return page;
	} else {
	    return 'log-in';
	}
    },
    'checkEmailVerified': function(page) 
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
Meteor.Router.filter('checkEmailVerified', {only: ['uploader','main','filemanager']});

