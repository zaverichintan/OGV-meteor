/**
 * authenticate user credentials, shows the errors if any
 */
Template.logIn.events({
    'submit #log-in-form':function(e,t)
    {
	e.preventDefault();

	var logInForm = $(e.currentTarget),
	    email = trimInput(logInForm.find('#log-in-email').val().toLowerCase()),
	    password = logInForm.find('#log-in-password').val();

	if (isNotEmpty(email) &&
	    isEmail(email) &&
	    isNotEmpty(password) &&
	    isValidPassword(password)) {
	    Meteor.loginWithPassword(email,password,function(err){
	        if (err) {
		    Session.set('alert',err);
		    console.log(err);
		} else {
		    Session.set('alert', 'Welcome back');
		}
	    });
	}

	return false;
	
    },
 
});	    
