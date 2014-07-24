Template.menu.events({
    'click #log-out':function(e,t)
    {
	Meteor.logout(function() {
	     Session.set('alert','Bye!, See you back soon');
	});
	
	return false;
    }
});
