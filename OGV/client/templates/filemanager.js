Template.filemanager.helpers({
    models: function() 
    {
	return Models.find({'userId' : Meteor.userId()});
    }
});
