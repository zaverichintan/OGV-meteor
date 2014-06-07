
/**
 * Helper for main template (main.html) that checks the variable showForgotPassword 
 * to see whether or not to show forgot password form
 */
  
Template.main.helpers({
    showForgotPassword:function()
    {
	return Session.get('showForgotPassword');
    }
});

/**
 * set variable named resetPasswordToken, if such a token exists. Such token shall 
 * when user clicks on the reset password link in the mail it got.
 */

if (Accounts._resetPasswordToken) {
    Session.set('resetPasswordToken', Accounts._resetPasswordToken);
}


Template.main.helpers({
    resetPasswordToken: function()
    {
	return Session.get('resetPasswordToken');
    }
});

Meteor.subscribe('models');
