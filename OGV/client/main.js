Template.main.helpers({
    showForgotPassword:function()
    {
	return Session.get('showForgotPassword');
    }
});


if (Accounts._resetPasswordToken) {
    Session.set('resetPasswordToken', Accounts._resetPasswordToken);
}

Template.main.helpers({
    resetPasswordToken: function()
    {
	return Session.get('resetPasswordToken');
    }
});
