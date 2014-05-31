/**
 * Shows the error in alert box on the main page
 */
Template.alert.helpers({
    alert: function()
    {
	return Session.get('alert');
    }
});
