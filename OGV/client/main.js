Template.main.helpers({
    showForgotPassword:function()
    {
	return Session.get('showForgotPassword');
    }
});


if (Accounts._resetPasswordToken) {
    Session.set('resetPassword', Accounts._resetPasswordToken);
}

Template.main.helpers({
    resetPassword: function()
    {
	return Session.get('resetPassword');
    }
});
