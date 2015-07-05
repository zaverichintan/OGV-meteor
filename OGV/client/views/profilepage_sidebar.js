Template.profileSidebar.helpers({
    userImg: function() 
    {    
    var currentUser = Meteor.user();
    var picId = currentUser.profile.pic;
    return ProfilePictures.findOne(picId).url();
    }
}); 
