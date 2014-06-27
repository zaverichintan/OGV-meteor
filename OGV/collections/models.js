Models = new Meteor.Collection('models');

ModelFiles = new FS.Collection("modelFiles", {
    stores: [new FS.Store.FileSystem("modelFiles")]
});

ModelFiles.allow({
    insert: function(userId, file) {
	return !! userId;
    },
    update: function(userId,file) {
	return !! userId;
    },
    download: function(userId, file) {
    	return true;
    }	
});

  
