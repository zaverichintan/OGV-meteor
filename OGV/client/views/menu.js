Template.menu.events({
    'click #log-out':function(e,t)
    {
	Meteor.logout(function() {
	     throwError('Bye!, See you back soon');
	});
	
	return false;
    }
});
