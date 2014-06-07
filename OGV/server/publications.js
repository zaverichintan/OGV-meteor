Meteor.publish('models', function() {
    return Models.find();
});
