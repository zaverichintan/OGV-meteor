OgvSettings = new Meteor.Collection('OgvSettings');

OgvSettings.allow({
    insert: function(userId, setting)
    {
	throw (new Meteor.Error(550, "You are not allowed to insert new settings, you can edit the old ones though"));
	return false;
    },
    update: function(userId, setting)
    {
	roles = Meteor.user().roles;
	var isAdmin = false;
	for (role in roles)
	{
	    if (roles[role] === 'admin') isAdmin = true;
	}
	if (!isAdmin) {
	    throw (new Meteor.Error(550, "Sorry you need to be admin before you can edit site settings"));
	}
	return isAdmin;
    }
});
