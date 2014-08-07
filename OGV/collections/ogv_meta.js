OgvSettings = new Meteor.Collection('OgvSettings');

OgvSettings.allow({
    insert: function(userId, setting)
    {
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
	console.log("is admin is");
	console.log(isAdmin);
	return isAdmin;
    }
});
