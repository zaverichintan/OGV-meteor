Template.profileSidebar.events({
    'click #followButton': function(e, t)
    {
        
    }, 

    'click #unfollowButton': function(e, t)
    {
        
    }
});


Template.profileSidebar.helpers({
    ownerInfo: function()
    {
        return Meteor.users.find({});
    },

    ownerImg: function()
    {
        var owner = Meteor.users.find({}).fetch();
        var picIds = _.pluck(owner, "profile.pic");
        return ProfilePictures.find({owner: {$in :picIds}});
    },

    suggestedModel: function()
    {
        return ModelFiles.find( {}, {sort:{timeUploaded:-1}});
    }
}); 


/**
* returns details about the current user to be displayed on the newsfeed
*/
Template.profileSidebar.myInfo = function()
{
    var currentUser =  Meteor.user();
    picId = currentUser.profile.pic;
    var followings = currentUser.profile.following;
    var followers = currentUser.profile.follower;
    var numberfollowings, numberfollowers, numberModels;

    if(followings.length == 0){
        numberfollowings = 0
    } else {
        numberfollowings = followings.length - 1;
    }

    if ( !followers ){
        numberfollowers = 0;
    } else {
        numberfollowers = followers.length;  
    }

    numberModels = ModelFiles.find({owner: currentUser._id}).count();
    return {
        myUser: currentUser,
        userImg: ProfilePictures.findOne(picId),
        followerCount: numberfollowers,
        followingCount: numberfollowings,
        modelCount: numberModels
    };

}

Template.profileSidebar.currentFollowsThis = function()
{
    var parts = location.href.split('/');
    var otherId = parts.pop(); //id of user whose page is being visited 
    var currentUser = Meteor.user();
    var currentFollowsThis = Meteor.users.findOne({_id: currentUser._id, "profile.following": otherId});

    if( currentFollowsThis ){
        return currentFollowsThis;
    }
    else{
        return null;
    }
}