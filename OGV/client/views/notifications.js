Notifications = new Meteor.Collection(null);

throwNotification = function(message) 
{
    Notifications.insert({message:message, seen:false, error:false});
}

throwError = function(message)
{
    Notifications.insert({message:message, seen:false, error:true});
}

clearNotifications = function()
{
    Notifications.remove({seen: true});
}

Template.notifications.helpers({
    notifications : function()
    {
	return Notifications.find();
    }
});

Template.notification.rendered = function()
{
    var notification = this.data;
    Meteor.defer(function() {
	Notifications.update(notification._id, {$set: {seen: true}});
    });
}   	 
