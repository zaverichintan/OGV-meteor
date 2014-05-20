Template.resetPassword.events({
    'submit #reset-password-form': function(e,t)
    {
	e.preventDefault();

	var resetPasswordForm = $(e.currentTarget),
	    password = resetPasswordForm.find('#reset-password-password').val(),
	    passwordConfirm = resetPasswordForm.find('#reset-password-confirm').val();
	
	if (isNotEmpty(password) &&
	    areValidPasswords(password,passwordConfirm)) {
	    Accounts.resetPassword(Session.get('resetPassword'),password,function(err)
	    {
		if (err) {
		    Session.set('alert', {type:'error', message:'We\'re sorry but something went wrong'});
		} else {
		    Session.set('alert', 'Your password has been changed. Welcome back!');
		    Session.set('resetPassword',null);
		}
	    });
	}
	return false;
    }
});
