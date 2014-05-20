Template.forgotPassword.events({
    'submit #forgot-password-form':function(e,t)
    {
	e.preventDefault();

	var forgotPasswordForm = $(e.currentTarget),
	    email = trimInput(forgotPasswordForm.find('#forgot-password-email').val().toLowerCase());

	if (isNotEmpty(email) &&
	    isEmail(email)) {
	    Accounts.forgotPassword({email:email},function(err){
		if (err) {
		    Session.set('alert',err);
	        } else {
		    Session.set('alert','Email Sent, Please check your mailbox to reset your password');
	        }
	    });
	}
	return false;
    },

    'click #returnToLogIn': function(e,t)
    {
	Session.set('showForgotPassword',null);
	return false;
    },
});
