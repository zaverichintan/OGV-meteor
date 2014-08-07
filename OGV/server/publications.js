Meteor.publish('models', function() {
    return Models.find();
});

Meteor.publish('modelFiles', function() {
    return ModelFiles.find();
});

Meteor.publish('objFiles', function() {
    return OBJFiles.find();
});

Meteor.publish('thumbFiles', function() {
    return ThumbFiles.find();
});

Meteor.publish('comments', function() {
    return Comments.find();
});


Meteor.publish('profilePictures', function() {
    return ProfilePictures.find();
});

Meteor.publish('lovers', function(){
    return Lovers.find();
});

Meteor.publish('ogvSettings', function(){
    return OgvSettings.find();
});

Meteor.publish('profiles', function() {
    return Meteor.users.find({}, {fields: {emails : 1, profile: 1, roles: 1}});
}); 
