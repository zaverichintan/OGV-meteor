Template.signUp.events({
    'submit #sign-up-form': function(e,t)
    {
	e.preventDefault();

        var signUpForm = $(e.currentTarget),
	    email = trimInput(signUpForm.find('#sign-up-email').val().toLowerCase()),
	    password = signUpForm.find('#sign-up-password').val(),
	    passwordConfirm = signUpForm.find('#sign-up-password-confirm').val(),
	    username = signUpForm.find('#sign-up-username').val();

	    /**
	     * Validates the sign up form fields and gives errors if any 
	     */

	    if (isNotEmpty(email) && 
		isNotEmpty(password) &&
		isNotEmpty(username) &&
		isEmail(email) &&
		areValidPasswords(password, passwordConfirm)) {
	        Accounts.createUser({email:email, password:password, username:username},function(err){
		    if (err) {
			Session.set('alert',err.message);
		    } else {
			Session.set('alert','Congrats! Check your inbox at' + email + 'to verify it');
		    }
		});
	    }
	return false;	
    },
});	
