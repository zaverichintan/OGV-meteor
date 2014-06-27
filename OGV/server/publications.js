Meteor.publish('models', function() {
    return Models.find();
});

Meteor.publish('modelFiles', function() {
    return ModelFiles.find();
});
